import { Injectable, NotFoundException } from '@nestjs/common'
import { db } from '@/drizzle/db'
import { eq } from 'drizzle-orm'
import { fasfacCause } from '@/drizzle/schema'
import { CreateFasfacCauseDto, UpdateFasfacCauseDto } from '@/dtos/fasfac.dto'

@Injectable()
export class FasfacCauseService {
  // constructor(private readonly fasfacCauseService: FasfacCauseService) {}
  async createCause(
    fasFacData: CreateFasfacCauseDto
  ): Promise<CreateFasfacCauseDto> {
    const [createdCause] = await db
      .insert(fasfacCause)
      .values(fasFacData)
      .returning()
    if (!createdCause) {
      throw new Error('Failed to create cause')
    }
    return createdCause
  }

  async findAll() {
    return db.select().from(fasfacCause)
  }

  async findOne(id: number) {
    const [cause] = await db
      .select()
      .from(fasfacCause)
      .where(eq(fasfacCause.id, id))
    if (!cause) {
      throw new NotFoundException(`Cause with id ${id} not found`)
    }
    return cause
  }

  async update(id: number, data: UpdateFasfacCauseDto) {
    const [updatedCause] = await db
      .update(fasfacCause)
      .set(data)
      .where(eq(fasfacCause.id, id))
      .returning()
    if (!updatedCause) {
      throw new NotFoundException(`Cause with id ${id} not found`)
    }
    return updatedCause
  }

  async delete(id: number) {
    const deletedRows = await db
      .delete(fasfacCause)
      .where(eq(fasfacCause.id, id))
    if (!deletedRows) {
      throw new NotFoundException(`Cause with id ${id} not found`)
    }
    return { message: 'Cause with id ${id} deleted' }
  }
}
