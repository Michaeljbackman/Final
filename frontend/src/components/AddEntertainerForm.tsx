import { useState } from "react";
import { Entertainer } from "../types/Entertainer";
import { addEntertainer } from "../api/EntertainersAPI";
import { useNavigate } from "react-router-dom";

const AddEntertainerForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Entertainer>({
    entertainerID: 0,
    entStageName: "",
    entStreetAddress: "",
    entCity: "",
    entState: "",
    entZipCode: "",
    entPhoneNumber: "",
    entWebPage: "",
    entEMailAddress: "",
    dateEntered: new Date().toISOString(),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addEntertainer(formData);
    navigate("/entertainers");
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add New Entertainer</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        {[
          ["Stage Name", "entStageName"],
          ["Street Address", "entStreetAddress"],
          ["City", "entCity"],
          ["State", "entState"],
          ["Zip Code", "entZipCode"],
          ["Phone Number", "entPhoneNumber"],
          ["Web Page", "entWebPage"],
          ["Email Address", "entEMailAddress"],
        ].map(([label, name]) => (
          <div className="col-md-6" key={name}>
            <label className="form-label">{label}</label>
            <input
              type="text"
              className="form-control"
              name={name}
              value={(formData as any)[name]}
              onChange={handleChange}
            />
          </div>
        ))}

        <div className="col-12">
          <button type="submit" className="btn btn-success me-2">
            Add Entertainer
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/entertainers")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEntertainerForm;
