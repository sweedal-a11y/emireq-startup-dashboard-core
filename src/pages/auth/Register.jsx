import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import emireqLogo from "../../assets/emireq-logo.png";
import "./Register.css";
import { registerStartup } from "../../apiCalls/startupAPI/startupAPICall";
import { STARTUP_REGISTER } from "../../services/endPoints";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [generalError, setGeneralError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear field-specific error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Clear general error when user starts typing
    if (generalError) {
      setGeneralError("");
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {
      username: "",
      email: "",
      password: "",
    };
    let isValid = true;

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous general error
    setGeneralError("");

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    const payload = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.confirmPassword,
    };
    const response = await registerStartup(STARTUP_REGISTER, payload);
    console.log(response);

    if (response.ok) {
      setIsLoading(false);
      sessionStorage.setItem("token", response.token);
      sessionStorage.setItem("user", JSON.stringify(response.user));
      navigate("/onboarding/step1");
    } else {
      setIsLoading(false);
      const error = response.errors;
      error && setGeneralError(error.username[0]);
    }
  };

  const handleSocialRegister = (provider) => {
    console.log(`Registering with ${provider}`);
    // Implement social registration logic here
  };

  console.log("generalError", generalError);

  const GoogleIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.9895 10.1871C19.9895 9.36767 19.9214 8.76973 19.7742 8.14966H10.1992V11.848H15.8195C15.7062 12.7671 15.0943 14.1512 13.7346 15.0813L13.7155 15.2051L16.7429 17.4969L16.9527 17.5174C18.8789 15.7789 19.9895 13.221 19.9895 10.1871Z"
        fill="#4285F4"
      />
      <path
        d="M10.1993 19.9313C12.9527 19.9313 15.2643 19.0454 16.9527 17.5174L13.7346 15.0813C12.8734 15.6682 11.7176 16.0779 10.1993 16.0779C7.50243 16.0779 5.21352 14.3395 4.39759 11.9366L4.27799 11.9465L1.13003 14.3273L1.08887 14.4391C2.76588 17.6945 6.21061 19.9313 10.1993 19.9313Z"
        fill="#34A853"
      />
      <path
        d="M4.39748 11.9366C4.18219 11.3166 4.05759 10.6521 4.05759 9.96565C4.05759 9.27909 4.18219 8.61473 4.38615 7.99466L4.38045 7.8626L1.19304 5.44366L1.08875 5.49214C0.397576 6.84305 0.000976562 8.36008 0.000976562 9.96565C0.000976562 11.5712 0.397576 13.0882 1.08875 14.4391L4.39748 11.9366Z"
        fill="#FBBC05"
      />
      <path
        d="M10.1993 3.85336C12.1142 3.85336 13.406 4.66168 14.1425 5.33718L17.0207 2.59107C15.253 0.985496 12.9527 0 10.1993 0C6.2106 0 2.76588 2.23672 1.08887 5.49214L4.38626 7.99466C5.21352 5.59183 7.50242 3.85336 10.1993 3.85336Z"
        fill="#EB4335"
      />
    </svg>
  );

  const LinkedInIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.5195 0H1.47656C0.660156 0 0 0.644531 0 1.44141V18.5547C0 19.3516 0.660156 20 1.47656 20H18.5195C19.3359 20 20 19.3516 20 18.5586V1.44141C20 0.644531 19.3359 0 18.5195 0ZM5.93359 17.043H2.96484V7.49609H5.93359V17.043ZM4.44922 6.19531C3.49609 6.19531 2.72656 5.42578 2.72656 4.47656C2.72656 3.52734 3.49609 2.75781 4.44922 2.75781C5.39844 2.75781 6.16797 3.52734 6.16797 4.47656C6.16797 5.42578 5.40234 6.19531 4.44922 6.19531ZM17.043 17.043H14.0781V12.4023C14.0781 11.2969 14.0586 9.87109 12.5352 9.87109C10.9922 9.87109 10.7578 11.0781 10.7578 12.3242V17.043H7.79297V7.49609H10.6406V8.80078H10.6797C11.0742 8.05078 12.043 7.25781 13.4844 7.25781C16.4883 7.25781 17.043 9.23438 17.043 11.8047V17.043Z"
        fill="#0077B5"
      />
    </svg>
  );

  const TrustBadgeIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.28086 12.9167C8.20647 12.6283 8.05615 12.3651 7.84555 12.1545C7.63494 11.9439 7.37176 11.7936 7.08336 11.7192L1.97086 10.4009C1.88364 10.3761 1.80687 10.3236 1.75221 10.2512C1.69754 10.1789 1.66797 10.0907 1.66797 10C1.66797 9.90938 1.69754 9.82118 1.75221 9.74884C1.80687 9.6765 1.88364 9.62397 1.97086 9.59921L7.08336 8.28005C7.37166 8.20572 7.63477 8.05552 7.84537 7.84508C8.05596 7.63463 8.20634 7.37162 8.28086 7.08338L9.5992 1.97088C9.6237 1.88331 9.67618 1.80616 9.74863 1.75121C9.82108 1.69625 9.90951 1.6665 10.0004 1.6665C10.0914 1.6665 10.1798 1.69625 10.2523 1.75121C10.3247 1.80616 10.3772 1.88331 10.4017 1.97088L11.7192 7.08338C11.7936 7.37177 11.9439 7.63496 12.1545 7.84556C12.3651 8.05616 12.6283 8.20648 12.9167 8.28088L18.0292 9.59838C18.1171 9.62263 18.1946 9.67505 18.2499 9.74761C18.3052 9.82017 18.3351 9.90885 18.3351 10C18.3351 10.0912 18.3052 10.1799 18.2499 10.2525C18.1946 10.325 18.1171 10.3775 18.0292 10.4017L12.9167 11.7192C12.6283 11.7936 12.3651 11.9439 12.1545 12.1545C11.9439 12.3651 11.7936 12.6283 11.7192 12.9167L10.4009 18.0292C10.3764 18.1168 10.3239 18.1939 10.2514 18.2489C10.179 18.3038 10.0905 18.3336 9.99961 18.3336C9.90868 18.3336 9.82025 18.3038 9.7478 18.2489C9.67535 18.1939 9.62287 18.1168 9.59836 18.0292L8.28086 12.9167Z"
        stroke="#FFC300"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.667 2.5V5.83333"
        stroke="#FFC300"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.3333 4.1665H15"
        stroke="#FFC300"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.33301 14.1665V15.8332"
        stroke="#FFC300"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.16667 15H2.5"
        stroke="#FFC300"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const FundingIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_115_13148)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.5 14C13.99 14 16 13 16 11.5V2C16 1 14 0 11.5 0C9 0 7 1 7 2V5.5C8.17 5.99 9.17 6.81 9.88 7.85C10.37 7.946 10.91 7.999 11.5 7.999C12.81 7.999 13.9 7.738 14.68 7.313C14.7907 7.25214 14.8985 7.18606 15.003 7.115V8.495C15.003 8.73 14.816 9.095 14.201 9.431C13.605 9.756 12.691 9.995 11.501 9.995C11.263 9.995 11.0363 9.986 10.821 9.968C10.901 10.2967 10.9543 10.6333 10.981 10.978C11.1497 10.9873 11.323 10.992 11.501 10.992C12.811 10.992 13.901 10.731 14.681 10.306C14.7917 10.2451 14.8995 10.1791 15.004 10.108V11.488C15.004 11.724 14.855 12.074 14.213 12.42C13.581 12.76 12.633 12.988 11.503 12.988C11.273 12.988 11.0503 12.9787 10.835 12.96C10.7581 13.2924 10.6548 13.6181 10.526 13.934C10.8407 13.9693 11.166 13.987 11.502 13.987L11.5 14ZM14.2 6.44C14.815 6.104 15.002 5.739 15.002 5.504V4.124C14.8987 4.19467 14.791 4.26067 14.679 4.322C13.901 4.747 12.809 5.008 11.499 5.008C10.189 5.008 9.099 4.747 8.319 4.322C8.20827 4.26114 8.10048 4.19506 7.996 4.124V5.504C7.996 5.739 8.183 6.104 8.798 6.439C9.394 6.764 10.308 7.003 11.498 7.003C12.688 7.003 13.598 6.764 14.198 6.439L14.2 6.44ZM8 2.5C8 2.212 8.125 1.935 8.358 1.766C8.485 1.674 8.623 1.582 8.732 1.532C9.005 1.406 10.372 0.999 11.502 0.999C12.632 0.999 13.612 1.226 14.272 1.532C14.396 1.589 14.533 1.678 14.654 1.766C14.885 1.933 15.004 2.208 15.004 2.493V2.499C15.004 2.734 14.817 3.099 14.202 3.435C13.606 3.76 12.692 3.999 11.502 3.999C10.312 3.999 9.402 3.759 8.802 3.435C8.187 3.1 8 2.734 8 2.5Z"
          fill="#FFC300"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9 11.5C9 13.99 6.99 16 4.5 16C2.01 16 0 13.99 0 11.5C0 9.01 2.01 7 4.5 7C6.99 7 9 9.01 9 11.5ZM8 11.5C8 13.43 6.43 15 4.5 15C2.57 15 1 13.43 1 11.5C1 9.57 2.57 8 4.5 8C6.43 8 8 9.57 8 11.5Z"
          fill="#FFC300"
        />
      </g>
      <defs>
        <clipPath id="clip0_115_13148">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  const ProgressIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.5 1.75V13.5H15.25C15.4489 13.5 15.6397 13.579 15.7803 13.7197C15.921 13.8603 16 14.0511 16 14.25C16 14.4489 15.921 14.6397 15.7803 14.7803C15.6397 14.921 15.4489 15 15.25 15H0.75C0.551088 15 0.360322 14.921 0.21967 14.7803C0.0790176 14.6397 0 14.4489 0 14.25L0 1.75C0 1.55109 0.0790176 1.36032 0.21967 1.21967C0.360322 1.07902 0.551088 1 0.75 1C0.948912 1 1.13968 1.07902 1.28033 1.21967C1.42098 1.36032 1.5 1.55109 1.5 1.75ZM15.78 4.28L10.53 9.53C10.3894 9.67045 10.1988 9.74934 10 9.74934C9.80125 9.74934 9.61063 9.67045 9.47 9.53L7 7.06L4.28 9.78C4.13785 9.91264 3.94975 9.9849 3.75536 9.98154C3.56097 9.97819 3.37548 9.89947 3.238 9.762C3.10053 9.62452 3.02181 9.43903 3.01846 9.24464C3.0151 9.05025 3.08736 8.86215 3.22 8.72L6.47 5.47C6.61063 5.32955 6.80125 5.25066 7 5.25066C7.19875 5.25066 7.38937 5.32955 7.53 5.47L10 7.94L14.72 3.22C14.8621 3.08736 15.0502 3.0151 15.2446 3.01846C15.439 3.02181 15.6245 3.10053 15.762 3.238C15.8995 3.37548 15.9782 3.56097 15.9815 3.75536C15.9849 3.94975 15.9126 4.13785 15.78 4.28Z"
        fill="#FFC300"
      />
    </svg>
  );

  const CertifiedIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_115_13167)">
        <path
          d="M11.8 6.11998C11.8579 6.04939 11.901 5.9679 11.9268 5.88035C11.9527 5.7928 11.9607 5.70096 11.9505 5.61025C11.9402 5.51955 11.9119 5.43181 11.8671 5.35224C11.8224 5.27267 11.7622 5.20288 11.69 5.14698C11.5432 5.03213 11.3573 4.97915 11.172 4.99932C10.9867 5.01949 10.8166 5.11123 10.698 5.25498L7.38798 9.31498L5.61798 7.95498C5.47339 7.83731 5.28856 7.78076 5.10288 7.79738C4.9172 7.81401 4.74536 7.90249 4.62398 8.04398C4.56468 8.11337 4.51989 8.19395 4.49225 8.28095C4.46462 8.36794 4.45471 8.45959 4.4631 8.55049C4.47149 8.64138 4.49801 8.72967 4.5411 8.81014C4.58419 8.8906 4.64298 8.96162 4.71398 9.01898L7.03398 10.829C7.18048 10.9482 7.36818 11.0045 7.5561 10.9858C7.74401 10.9671 7.91689 10.8747 8.03698 10.729L11.797 6.10898L11.8 6.11998Z"
          fill="#FFC300"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.51 0.713997C7.044 0.321997 7.311 0.125997 7.6 0.0499974C7.85824 -0.0155265 8.12876 -0.0155265 8.387 0.0499974C8.679 0.125997 8.947 0.321997 9.477 0.713997L10.154 1.211C10.339 1.347 10.432 1.415 10.532 1.468C10.6213 1.51466 10.7143 1.55333 10.811 1.584C10.92 1.617 11.033 1.634 11.26 1.669L12.09 1.796C12.745 1.896 13.072 1.947 13.33 2.1C13.56 2.235 13.752 2.427 13.887 2.657C14.04 2.917 14.09 3.245 14.191 3.897L14.318 4.727C14.353 4.954 14.37 5.068 14.403 5.177C14.433 5.27366 14.4717 5.36633 14.519 5.455C14.573 5.555 14.64 5.648 14.776 5.833L15.273 6.51C15.665 7.044 15.861 7.311 15.937 7.6C16.0025 7.85824 16.0025 8.12876 15.937 8.387C15.862 8.679 15.665 8.947 15.273 9.477L14.776 10.154C14.6808 10.2733 14.5949 10.3996 14.519 10.532C14.4716 10.6214 14.4327 10.7152 14.403 10.812C14.37 10.92 14.353 11.033 14.318 11.26L14.191 12.09C14.091 12.745 14.04 13.072 13.887 13.33C13.752 13.56 13.56 13.752 13.33 13.887C13.07 14.04 12.742 14.09 12.09 14.191L11.26 14.318C11.1084 14.3352 10.9583 14.364 10.811 14.404C10.7143 14.4333 10.6213 14.472 10.532 14.52C10.432 14.573 10.339 14.64 10.154 14.777L9.477 15.274C8.943 15.666 8.676 15.862 8.387 15.938C8.12876 16.0035 7.85824 16.0035 7.6 15.938C7.308 15.862 7.04 15.666 6.51 15.274L5.833 14.777C5.71372 14.6818 5.58735 14.5959 5.455 14.52C5.36586 14.4726 5.27245 14.4338 5.176 14.404C5.02874 14.364 4.87863 14.3352 4.727 14.318L3.897 14.191C3.242 14.091 2.914 14.041 2.657 13.887C2.42781 13.7507 2.23634 13.5592 2.1 13.33C1.947 13.07 1.897 12.742 1.796 12.09L1.669 11.26C1.634 11.033 1.617 10.92 1.584 10.811C1.55482 10.7143 1.51596 10.6209 1.468 10.532C1.39207 10.3996 1.30615 10.2733 1.211 10.154L0.713997 9.477C0.321997 8.943 0.125997 8.677 0.0499974 8.387C-0.0155265 8.12876 -0.0155265 7.85824 0.0499974 7.6C0.124997 7.308 0.321997 7.04 0.713997 6.51L1.211 5.833C1.347 5.648 1.415 5.555 1.468 5.455C1.51466 5.36633 1.55333 5.27333 1.584 5.176C1.617 5.067 1.634 4.954 1.669 4.727L1.796 3.897C1.896 3.242 1.947 2.914 2.1 2.657C2.235 2.427 2.427 2.237 2.657 2.1C2.917 1.947 3.245 1.897 3.897 1.796L4.727 1.669C4.954 1.635 5.068 1.617 5.176 1.584C5.27266 1.554 5.36566 1.51533 5.455 1.468C5.555 1.415 5.648 1.347 5.833 1.211L6.51 0.713997ZM8.89 1.52L9.601 2.042C9.752 2.153 9.901 2.263 10.067 2.351C10.2137 2.429 10.3657 2.492 10.523 2.54C10.7029 2.58973 10.886 2.62683 11.071 2.651L11.943 2.785C12.684 2.899 12.776 2.93 12.83 2.962C12.9147 3.01266 12.982 3.08 13.032 3.164C13.064 3.218 13.096 3.31 13.209 4.051L13.343 4.923C13.3672 5.10803 13.4043 5.29114 13.454 5.471C13.5027 5.62966 13.5657 5.78166 13.643 5.927C13.731 6.093 13.841 6.242 13.952 6.393L14.474 7.104C14.918 7.708 14.96 7.795 14.976 7.857C14.9991 7.95094 14.9991 8.04906 14.976 8.143C14.96 8.204 14.918 8.291 14.474 8.896L13.952 9.607C13.841 9.758 13.731 9.907 13.643 10.073C13.5657 10.2187 13.5024 10.3713 13.454 10.529C13.4043 10.7089 13.3672 10.892 13.343 11.077L13.209 11.949C13.095 12.69 13.064 12.782 13.032 12.836C12.9819 12.9186 12.9126 12.9879 12.83 13.038C12.776 13.07 12.684 13.102 11.943 13.215L11.071 13.349C10.886 13.3732 10.7029 13.4103 10.523 13.46C10.3653 13.5084 10.2127 13.5717 10.067 13.649C9.901 13.737 9.752 13.847 9.601 13.958L8.89 14.48C8.286 14.924 8.199 14.966 8.137 14.982C8.04306 15.0051 7.94494 15.0051 7.851 14.982C7.79 14.966 7.703 14.924 7.098 14.48L6.387 13.958C6.23906 13.8443 6.08335 13.741 5.921 13.649C5.77534 13.5717 5.62265 13.5084 5.465 13.46C5.28514 13.4103 5.10203 13.3732 4.917 13.349L4.045 13.215C3.304 13.101 3.212 13.07 3.158 13.038C3.07538 12.9879 3.00609 12.9186 2.956 12.836C2.924 12.782 2.892 12.69 2.779 11.949L2.645 11.077C2.62083 10.892 2.58373 10.7089 2.534 10.529C2.4856 10.3713 2.42232 10.2187 2.345 10.073C2.257 9.907 2.147 9.758 2.036 9.607L1.514 8.896C1.07 8.292 1.028 8.205 1.012 8.143C0.988944 8.04906 0.988944 7.95094 1.012 7.857C1.028 7.796 1.07 7.709 1.514 7.104L2.036 6.393C2.147 6.242 2.257 6.093 2.345 5.927C2.42233 5.78033 2.48533 5.62833 2.534 5.471C2.58373 5.29114 2.62083 5.10803 2.645 4.923L2.779 4.051C2.893 3.31 2.924 3.218 2.956 3.164C3.00609 3.08138 3.07538 3.01209 3.158 2.962C3.212 2.93 3.304 2.898 4.045 2.785L4.917 2.651C5.10203 2.62683 5.28514 2.58973 5.465 2.54C5.62366 2.49133 5.77566 2.42833 5.921 2.351C6.087 2.263 6.236 2.153 6.387 2.042L7.098 1.52C7.702 1.076 7.789 1.034 7.851 1.018C7.94494 0.994944 8.04306 0.994944 8.137 1.018C8.198 1.034 8.285 1.076 8.89 1.52Z"
          fill="#FFC300"
        />
      </g>
      <defs>
        <clipPath id="clip0_115_13167">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  return (
    <div className="register-container">
      {/* Left Side - Register Form */}
      <div className="register-left">
        <div className="register-form-wrapper">
          <div className="register-logo">
            <img
              src={emireqLogo}
              alt="Emireq Logo"
              className="logo-image"
              onClick={() => navigate("/")}
            />
          </div>

          <div className="register-content">
            <h1 className="register-title">Welcome back</h1>
            <p className="register-subtitle">
              Access your startup dashboard and funding journey
            </p>

            {generalError && (
              <div className="error-banner">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="9"
                    stroke="#DC2626"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M10 6V10M10 14H10.01"
                    stroke="#DC2626"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span>{generalError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="register-form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={errors.username ? "error" : ""}
                />
                {errors.username && (
                  <div className="error-message">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="8"
                        cy="8"
                        r="7"
                        stroke="#DC2626"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <path
                        d="M8 4V8M8 11H8.01"
                        stroke="#DC2626"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span>{errors.username}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? "error" : ""}
                />
                {errors.email && (
                  <div className="error-message">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="8"
                        cy="8"
                        r="7"
                        stroke="#DC2626"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <path
                        d="M8 4V8M8 11H8.01"
                        stroke="#DC2626"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="••••••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={errors.password ? "error" : ""}
                  />
                </div>
                {errors.password && (
                  <div className="error-message">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="8"
                        cy="8"
                        r="7"
                        stroke="#DC2626"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <path
                        d="M8 4V8M8 11H8.01"
                        stroke="#DC2626"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span>{errors.password}</span>
                  </div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="••••••••••••"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={errors.confirmPassword ? "error" : ""}
                  />
                </div>
                {errors.confirmPassword && (
                  <div className="error-message">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="8"
                        cy="8"
                        r="7"
                        stroke="#DC2626"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      <path
                        d="M8 4V8M8 11H8.01"
                        stroke="#DC2626"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span>{errors.confirmPassword}</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="btn-register"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register"}
              </button>

              <p className="login-prompt">
                Already have an account?{" "}
                <a
                  href="/auth/login"
                  className="login-link"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/auth/login");
                  }}
                >
                  Log in
                </a>
              </p>

              <div className="divider">
                <span>Or</span>
              </div>

              <button
                type="button"
                className="btn-social btn-google"
                onClick={() => handleSocialRegister("google")}
              >
                <GoogleIcon />
                <span>Register with Google</span>
              </button>

              <button
                type="button"
                className="btn-social btn-linkedin"
                onClick={() => handleSocialRegister("linkedin")}
              >
                <LinkedInIcon />
                <span>Register with Linkedin</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side - Branding */}
      <div className="register-right">
        <div className="register-right-header">
          <div className="trust-badge">
            <TrustBadgeIcon />
            <span>Trusted by 50,000+ users worldwide</span>
          </div>

          <div className="language-selector">
            <span>English(UK)</span>
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L6 6L11 1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="branding-content">
          <h2 className="branding-title">
            Build Your Startup the
            <br />
            Shariah Way
          </h2>

          <div className="quote-icon">
            <svg
              width="25"
              height="20"
              viewBox="0 0 25 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 0C22.0938 0 22.6406 0.21875 22.6406 0.65625C22.6406 0.84375 22.4688 1 22.125 1.125C19.25 2.28125 17.8125 4.53125 17.8125 7.875C18.25 7.8125 18.5625 7.78125 18.75 7.78125C22.5 7.78125 24.375 9.65625 24.375 13.4062C24.375 17.125 22.5 18.9844 18.75 18.9844C14.4062 18.9844 12.2344 16.5938 12.2344 11.8125C12.2344 6.65625 14.3125 2.95312 18.4688 0.703125C19.3438 0.234375 20.1875 0 21 0ZM8.76562 0.140625C9.85938 0.140625 10.4062 0.359375 10.4062 0.796875C10.4062 0.984375 10.2344 1.14062 9.89062 1.26562C7.01562 2.42188 5.57812 4.67188 5.57812 8.01562C6.01562 7.95312 6.32812 7.92188 6.51562 7.92188C10.2656 7.92188 12.1406 9.79688 12.1406 13.5469C12.1406 17.2656 10.2656 19.125 6.51562 19.125C2.17188 19.125 0 16.7344 0 11.9531C0 6.79688 2.07812 3.09375 6.23438 0.84375C7.10938 0.375 7.95312 0.140625 8.76562 0.140625Z"
                fill="#CBDBFC"
              />
            </svg>
          </div>

          <p className="branding-description">
            Connect with ethical investors, secure funding, and scale your
            business on a platform built for Shariah compliance and
            transparency.
          </p>

          <div className="branding-features">
            <div className="feature-item">
              <div className="feature-icon">
                <FundingIcon />
              </div>
              <div className="feature-text">
                <h3>Access to Funding</h3>
                <p>Connect with 10,000+ verified investors</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <ProgressIcon />
              </div>
              <div className="feature-text">
                <h3>Track Your Progress</h3>
                <p>Real-time analytics and engagement insights</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <CertifiedIcon />
              </div>
              <div className="feature-text">
                <h3>Shariah Certified</h3>
                <p>All deals verified by Islamic finance experts</p>
              </div>
            </div>
          </div>

          <div className="decorative-element"></div>
        </div>
      </div>
    </div>
  );
};

export default Register;
