export interface CustomVacation {
    id: string
    hairdresser: {
        id: string
        name: string
    }
    startDate: string
    endDate: string
    createdAt?: string
    updatedAt?: string
    isApproved?: boolean
}