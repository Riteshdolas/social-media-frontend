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
        const token = data.token;
        localStorage.setItem("token", token);
        return { success: true, message: "Signed up successfully" };
      } else {
        return { success: false, message: data.message || "Signup failed" };
      }
    } catch (error) {
      console.log(error);
      return { success: false, message: error.message };
    }
  }

  async Login(formData) {
    const url = "http://localhost:8000/api/user/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    try {
      const res = await fetch(url, options);
      const data = await res.json();

      if (res.ok) {
        const token = data.token;
        localStorage.setItem("token", token);
        return { success: true, message: "Signed up successfully" };
      } else {
        return { success: false, message: data.error || "Signup failed" };
      }
    } catch (error) {
      console.log(error);
      return { success: false, message: error.message };
    }
  }
}

export default Auth;
