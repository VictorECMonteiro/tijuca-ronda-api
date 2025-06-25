import axios from "axios"
import fs from "fs"

const form = new FormData()


form.append("Arquivo1", fs.createReadStream("./POLICIAL.png"))

const result = await axios.post("http://192.168.9.249:3170/", form, {headers:{
    "Content-Type": "multipart/form-data"
}})

console.log(result)

