import PopupMessage from "../components/PopupMessage";
class Auth {
  
  async Signup(formData, showPopup) {
    const url = "http://localhost:8000/api/user/register";
    const options = {
      method: "POST",
      body: formData,
    };

    try {
      const res = await fetch(url, options);
      const data = await res.json();
       
      if (res.ok) {
        const token = data.token
        localStorage.setItem("token", token)
        showPopup("Logged In", "success");
      } else {
        showPopup(data.message || "Something went wrong", "error");
      }
    } catch (error) {
      console.log(error);
      showPopup(error.message);
    }
  }

  async Login(formData, showPopup) {
    const url = "http://localhost:8000/api/user/login"
    const options = {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(formData),
    };

    try {
      const res = await fetch(url, options);
      const data = await res.json();
 
      if (res.ok) {
        const token = data.token
        localStorage.setItem("token", token)
        showPopup("Logged In", "success");
      } else {
        showPopup(data.error || "Something went wrong", "error");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default Auth;
