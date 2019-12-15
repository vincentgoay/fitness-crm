export interface Record {
    _id?: string,
    cust_id?: string,
    weight?: number,
    fat_percentage?: number,
    visceral_fat?: number,
    bmi?: number,
    metabolism?: number,
    muscle_percentage?: number,
    body_age?: number,
    carotenoid?: number,
    updated_on?: Date,
    recorded_date?: Date,
    deleted?: boolean
}