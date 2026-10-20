import type { Capture } from '../entities/capture';

export type CreateCaptureData = Omit<Capture, 'id' | 'capturedAt'>;

export interface ICaptureRepository {
  create(data: CreateCaptureData): Promise<Capture>;
  findByTrainerId(trainerId: string): Promise<Capture[]>;
  countByTrainerId(trainerId: string): Promise<number>;
}
