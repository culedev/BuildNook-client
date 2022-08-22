// HOOKS
import { useState } from "react"
import { useNavigate } from "react-router-dom"
// SERVICES
import { editProfile } from "../../services/profile.services"
import { uploadService } from "../../services/upload.services"

const EditProfile = () => {
  const navigate = useNavigate()
  const [imageUrl, setImageUrl] = useState("")

  const handleImgUpload = async (event) => {
    const form = new FormData()
    form.append("imageUrl", event.target.files[0])

    try {
      const response = await uploadService(form)
      setImageUrl(response.data)
      await editProfile(imageUrl)
    } catch (error) {
      navigate("/error")
    }
  }

  const handleSubmit = async () => {
    try {
      await editProfile(imageUrl)
      console.log(imageUrl)
    } catch (error) {
      navigate("/error")
    }
  }

  return (
    <div>
      
      <h1>Add image</h1>
      <input type="file" onChange={handleImgUpload}/>
      <form onSubmit={handleSubmit}>
        <button>Update Profile</button>
      </form>

    </div>
  )
}

export default EditProfile