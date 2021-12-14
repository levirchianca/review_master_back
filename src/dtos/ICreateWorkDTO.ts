interface ICreateWorkDTO {
  name: string;
  published_at: Date;
  description: string;
  gender: string;
  platforms?: string;
  game_mode?: string;
  origin_country?: string;
}

export default ICreateWorkDTO;