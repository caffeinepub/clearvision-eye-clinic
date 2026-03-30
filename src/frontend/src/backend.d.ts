import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Appointment {
    serviceType: string;
    email: string;
    preferredDate: string;
    preferredTime: string;
    patientName: string;
    phone: string;
}
export interface backendInterface {
    bookAppointment(appointmentId: string, patientName: string, email: string, phone: string, preferredDate: string, preferredTime: string, serviceType: string): Promise<void>;
    getAllAppointments(): Promise<Array<Appointment>>;
}
