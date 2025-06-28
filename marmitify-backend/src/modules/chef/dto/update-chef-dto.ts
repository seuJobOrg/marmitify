export class UpdateChefDto {
    phone?: string;
    bio?: string;
    avatar?: string;
    isActive?: boolean;
    
    constructor(partial: Partial<UpdateChefDto>) {
        Object.assign(this, partial);
    }
}