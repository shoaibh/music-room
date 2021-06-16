import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ETable } from '../ETable';
import ModelEntity from '../util/model.entity';
import { BeforeUpdate } from 'typeorm/index';
import RoomEntity from './room.entity';

@Entity({ name: ETable.User })
export default class UserEntity extends ModelEntity<UserEntity> {
  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column({ name: 'room_id', type: 'int' })
  roomId: number;

  @ManyToOne(() => RoomEntity, (room) => room.users)
  @JoinColumn({ name: 'room_id' })
  public room: Promise<RoomEntity>;

  @BeforeInsert()
  @BeforeUpdate()
  public async beforeInsertHooks() {
    this.email = this.email.toLowerCase();
  }

  toJSON({
    includes = ['id', 'name', 'email'],
    skips = [],
  }: {
    includes?: (keyof UserEntity)[];
    skips?: (keyof UserEntity)[];
  }): Partial<UserEntity> {
    const d: any = super.toJSON({ includes, skips });
    return d;
  }
}
