import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";


export enum PaymentMethod {
    CREDIT_CARD =  'credit_card',
    DEBIT_CARD = 'debit_card',
    E_WALLET = 'e_wallet'
}

export enum PaymentStatus {
    SUCCESSFUL = 'successful',
    PENDING = 'pending',
    FAILED = 'failed'
}
@Entity('payments')
export class PaymentEntity {
    @PrimaryGeneratedColumn("uuid")
    id: number

    @Column()
    order_id: string;

    @Column()
    amount: string;

    @Column({
        type: 'enum',
        enum: PaymentMethod,
    })
    payment_method: PaymentMethod;

    @Column({
        type: 'enum',
        enum: PaymentStatus,
        default: PaymentStatus.PENDING
    })
    payment_status: string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}