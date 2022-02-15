import { Interaction, User, Post } from "friend_of_all/domain";

class InterationImpl extends Interaction {
  note: number;
  title: string;
  description: string;

  constructor(post: Post, user: User, note: number, title: string, description: string, id?: string) {
    if (id) {
      super(post, user);
    } else {
      super(post, user, id);
    }
    
    this.note = note;
    this.title = title;
    this.description = description;
  }
}

export default InterationImpl;