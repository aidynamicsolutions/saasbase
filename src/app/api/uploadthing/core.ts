import { db } from "@/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { createUploadthing, type FileRouter } from "uploadthing/next"
import { PDFLoader } from "langchain/document_loaders/fs/pdf"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { PineconeStore } from "langchain/vectorstores/pinecone"
import { pinecone } from "@/lib/pinecone"

const f = createUploadthing()

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      const { getUser } = getKindeServerSession()
      const user = getUser()

      if (!user || !user.id) throw new Error("Unauthorized")
      return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // metadat was pass in by the middleware above
      // This code RUNS ON YOUR SERVER after upload, responsible for storing the file metadata in the db
      const createdFile = await db.file.create({
        data: {
          key: file.key,
          name: file.name,
          userId: metadata.userId,
          url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
          uploadStatus: "PROCESSING",
        },
      })

      try {
        const response = await fetch(
          `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`
        )

        const blob = await response.blob()
        const loader = new PDFLoader(blob)
        const pageLevelDocs = await loader.load()
        const pageAmt = pageLevelDocs.length

        // vectorize and index entire document
        const pineconeIndex = pinecone.Index("yolo")

        await PineconeStore.fromDocuments(
          pageLevelDocs,
          new OpenAIEmbeddings(),
          {
            pineconeIndex,
            // namespace: createdFile.id, // adding this break the storing on pinecone. try another service later
          }
        )

        await db.file.update({
          data: { uploadStatus: "SUCCESS" },
          where: { id: createdFile.id },
        })
      } catch (error) {
        await db.file.update({
          data: { uploadStatus: "FAILED" },
          where: { id: createdFile.id },
        })
      }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
