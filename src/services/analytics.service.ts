import { Injectable } from '@nestjs/common'
import { authDb, db } from '@/drizzle/db'
import { FeedbackReportDto } from '@/dtos'
import _ from 'lodash'

@Injectable()
export class AnalyticsService {
  constructor() {}

  async getFeedbackReport(): Promise<FeedbackReportDto[]> {
    const allUsers = await authDb.query.users.findMany({
      columns: {
        id: true,
        name: true,
        email: true
      }
    })
    const allFeedbacks = await db.query.feedbacks.findMany({
      columns: {
        rating: true,
        comment: true,
        userId: true,
        createdAt: true
      }
    })

    const feedbackReport = allFeedbacks.map((feedback) => {
      const user = allUsers.find((u) => u.id === feedback.userId)
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        rating: feedback.rating,
        comment: feedback.comment,
        createdAt: feedback.createdAt
      }
    })

    return feedbackReport
  }
}
