import { useState } from "react";
import { Entertainer } from "../types/Entertainer";
import { updateEntertainer } from "../api/EntertainersAPI";

interface EditEntertainerFormProps {
  entertainer: Entertainer;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditEntertainerForm = ({ entertainer, onSuccess, onCancel }: EditEntertainerFormProps) => {
  const [formData, setFormData] = useState<Entertainer>({ ...entertainer });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateEntertainer(formData.entertainerID, formData);
    onSuccess(); // 👈 Let AdminPage refresh the list
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Edit Entertainer</h2>
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
          <button type="submit" className="btn btn-warning me-2">
            Update
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEntertainerForm;
