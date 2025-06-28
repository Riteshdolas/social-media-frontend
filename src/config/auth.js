import PopupMessage from "../components/PopupMessage";
class Auth {

url = "http://localhost:8000/api/user/register";


  async Signup(formData, showPopup) {
      const options = {
      method: "POST",
      body: formData,
    };

    try {
      const res = await fetch(this.url, options);
      const data = await res.json();

        if (res.ok) {
        showPopup("Logged In", "success");
      } else {
        showPopup(data.message || "Something went wrong", "error");
      }

    } catch (error) {
      console.log(error);
      showPopup(error.message)
    }
  };
}

export default Auth
