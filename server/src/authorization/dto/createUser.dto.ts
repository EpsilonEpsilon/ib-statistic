import { IsNotEmpty } from 'class-validator';

class CreateUserDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}

export default CreateUserDto;
