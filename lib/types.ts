export interface IUser {
  id: string | number
  username: string
  email: string
  groups?: IGroup[]
  posts?: IPost[]
  comments?: IComment[]
}

export interface IPost {
  id: string | number
  title: string
  body: string
  createdAt: Date
  updatedAt: Date
  author?: IUser
  group?: IGroup
  comments?: IComment[]
}

export interface IGroup {
  id: string | number
  name: string
  description: string
  admins?: IUser[]
  users?: IUser[]
  posts?: IPost[]
}

export interface IComment {
  id: string | number
  body: string
  createdAt: Date
  updatedAt: Date
  author: IUser
  post: IPost
}
