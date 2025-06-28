export class CreateChefDto {
    phone: string;
    bio: string;
    avatar: string;
    isActive: boolean;
    
    constructor(partial: Partial<CreateChefDto>) {
        Object.assign(this, partial);
    }
}