import { Payment } from './entities/payment.entity';
import { PaymentsService } from './payments.service';
export declare class PaymentsResolver {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    createPayment(amount: number): Promise<Payment[]>;
    fetchPayments(): Promise<Payment[]>;
}
