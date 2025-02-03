import { Injectable, NotFoundException } from '@nestjs/common'
import { db } from '@/drizzle/db'
import { eq } from 'drizzle-orm'
import { fasfacUserPrefs } from '@/drizzle/schema'
import {
  CreateFasfacUserPrefsDto,
  UpdateFasfacUserPrefsDto
} from '@/dtos/fasfac-user.dto'

@Injectable()
export class FasfacUserPrefsService {
  async create(
    createFasfacUserPrefsDto: CreateFasfacUserPrefsDto
  ): Promise<CreateFasfacUserPrefsDto> {
    const [createdUserPref] = await db
      .insert(fasfacUserPrefs)
      .values(createFasfacUserPrefsDto)
      .returning()
    if (!createdUserPref) {
      throw new Error('Failed to create user preference')
    }
    return createdUserPref
  }

  async findAll() {
    return db.select().from(fasfacUserPrefs)
  }

  async findOne(id: number) {
    const [userPref] = await db
      .select()
      .from(fasfacUserPrefs)
      .where(eq(fasfacUserPrefs.id, id))
    if (!userPref) {
      throw new NotFoundException(`User preference with id ${id} not found`)
    }
    return userPref
  }

  async update(id: number, updateFasfacUserPrefsDto: UpdateFasfacUserPrefsDto) {
    const [updatedUserPref] = await db
      .update(fasfacUserPrefs)
      .set(updateFasfacUserPrefsDto)
      .where(eq(fasfacUserPrefs.id, id))
      .returning()
    if (!updatedUserPref) {
      throw new NotFoundException(`User preference with id ${id} not found`)
    }
    return updatedUserPref
  }
}
