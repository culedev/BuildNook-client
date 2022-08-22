import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { uploadService } from "../../services/upload.services"

const EditProfile = () => {
  const navigate = useNavigate()
  const [imageUrl, setImageUrl] = useState("")

  const handleImgUpload = async (event) => {
    console.log(event.target.files[0])
    const form = new FormData()
    form.append("imageUrl", event.target.files[0])

    try {
      const response = await uploadService(form)
      setImageUrl(response.data.imageUrl)
    } catch (error) {
      navigate("/error")
    }
  }


  return (
    <div>
    
      <h1>Add image</h1>
      <input type="file" onChange={handleImgUpload}/>
      <br />
      <img src={imageUrl} alt="img" width={200}/>
    </div>
  )
}

export default EditProfile