// Helper method to wait for a middleware to execute before continuing
import { NextApiRequest, NextApiResponse } from 'next'

// And to throw an error when an error happens in a middleware
export default function initMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  middleware: any
) {
  return new Promise((resolve, reject) => {
    middleware(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}
