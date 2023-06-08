import connectMongo from '../../../database/connect';
import Users from '../../../model/schema'
import { hash } from 'bcryptjs'

export default async function handler(req: any, res: any){
  connectMongo().catch(error => res.json({ error: "Connection Failed...!"}))

  if(req.method === "POST"){

    if(!req.body)return res.status(404).json({error: "Don't have form data..!"});
    const { email, password } = req.body

    //check duplicate users
    const checkingExisting = await Users.findOne({email})
    if (checkingExisting) return res.status(422).json({message: "User Already Exist...!"})

    //hash password
    Users.create({email, password: await hash(password, 12)}, function(err: any, data: any) {
      if(err) return res.status(404).json({err})
       res.status(201).json({ status: true, user: data})
    })



  }else {
    res.status(500).json({message:"HTTP method not valid only POST Accepted"})
  }
}