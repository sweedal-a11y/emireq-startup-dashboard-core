import styles from "./onBoarding.module.css";
import emireqLogo from "../../assets/emireq-logo.png";
import { previewData } from "../../utils/utils";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onboardingStep } from "../../apiCalls/startupAPI/startupAPICall";
import { STARTUP_STEP } from "../../services/endPoints";

const Onboarding = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: "",
    domain: "",
    website: "",
    industry: "",
    city_name: "",
    region_name: "",
    country_name: "",
    zip_code: "",
    employees: "",
    revenue: "",
    founded_year: "",
    founded_date: "",
    naics: "",
    naics_description: "",
    sic_code: "",
    sic_code_description: "",
    ticker: "",
    linkedin_profile: "",
    logo: "",
  });

  const getPreviewData = () => previewData;

  // 🔥 Auto-fill from previewData
  useEffect(() => {
    const data = getPreviewData();

    if (!data) return;

    setFormData({
      companyName: data.company_name || "",
      domain: data.domain || "",
      website: data.website || "",
      industry: data.industry || "",
      city_name: data.raw?.city_name || "",
      region_name: data.raw?.region_name || "",
      country_name: data.raw?.country_name || "",
      zip_code: data.raw?.zip_code || "",
      employees: data.employees || "",
      revenue: data.revenue || "",
      founded_year: data.founded_year || "",
      founded_date: data.founded_date || "",
      naics: data.raw?.naics || "",
      naics_description: data.raw?.naics_description || "",
      sic_code: data.raw?.sic_code || "",
      sic_code_description: data.raw?.sic_code_description || "",
      ticker: data.raw?.ticker || "",
      linkedin_profile: data.linkedin_profile || "",
      logo: data.logo || data.raw?.business_logo || "",
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContinue = () => {
    const payload = {
      company_name: formData.companyName,
      domain: formData.domain,
      country: formData.country_name,
    };

    const response = onboardingStep(STARTUP_STEP + "1/", payload, true);
    if (response.ok) {
      navigate("/overview");
    }
  };

  return (
    <div className={styles.container}>
      <img className={styles.logo} src={emireqLogo} alt="logo" />

      <div className={styles.headingContainor}>
        <div className={styles.textContainer}>
          <h2>Tell us about your startup</h2>
          <p>
            Tell us a little about your startup - we'll personalize your
            experience.
          </p>
        </div>

        {/* Company Header */}
        <div>
          <div className={styles.companyHeader}>
            <img
              className={styles.companyLogo}
              src={formData.logo}
              alt="company"
            />
            <h2>{formData.companyName || "Company Name"}</h2>
          </div>

          {formData.linkedin_profile && (
            <button
              className={styles.linkedinBtn}
              onClick={() => window.open(formData.linkedin_profile, "_blank")}
            >
              View Linkedin
            </button>
          )}
        </div>
      </div>

      {/* Form Fields */}
      <div className={styles.contentWarpper}>
        {Object.keys(formData).map((key) => {
          if (key === "linkedin_profile" || key === "logo") return null;

          return (
            <div key={key} className="onboarding-form-group preview-input">
              <label htmlFor={key}>
                {key.replace(/_/g, " ").toUpperCase()}
                <span className="required">*</span>
              </label>
              <input
                type="text"
                id={key}
                name={key}
                value={formData[key] || ""}
                onChange={handleInputChange}
                placeholder={key.replace(/_/g, " ")}
              />
            </div>
          );
        })}
      </div>
      <button className={styles.linkedinBtn} onClick={() => handleContinue()}>
        Update & Continue
      </button>
    </div>
  );
};

export default Onboarding;
