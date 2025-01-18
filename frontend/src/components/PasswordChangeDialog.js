// import React, { useState } from "react";
// import "../components/css/PasswordChangeDialog.css";
// import { toast } from "react-toastify";

// const PasswordChangeDialog = ({ isOpen, onClose, onChangePassword,username }) => {
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError("");

//     if (newPassword !== confirmPassword) {
//       setError("New passwords don't match");
//       toast.error("Passwords don't match!");

//       return;
//     }

//     onChangePassword(currentPassword, newPassword);
//     // onClose();
//   };

//   return (
//     isOpen && (
//       <div className="dialog-overlay">
//         <div className="dialog">
//           <h2 className="dialog-title">Change Password</h2>
//           <form onSubmit={handleSubmit} className="dialog-form">
//             <div className="form-group">
//               <label className="form-label">
//                 Current Password
//                 <input
//                   className="form-input"
//                   type="password"
//                   value={currentPassword}
//                   onChange={(e) => setCurrentPassword(e.target.value)}
//                   required
//                   placeholder="Enter current password"
//                 />
//               </label>
//             </div>
//             <div className="form-group">
//               <label className="form-label">
//                 New Password
//                 <input
//                   className="form-input"
//                   type="password"
//                   value={newPassword}
//                   onChange={(e) => setNewPassword(e.target.value)}
//                   required
//                   placeholder="Enter new password"
//                 />
//               </label>
//             </div>
//             <div className="form-group">
//               <label className="form-label">
//                 Confirm New Password
//                 <input
//                   className="form-input"
//                   type="password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   required
//                   placeholder="Confirm new password"
//                 />
//               </label>
//             </div>
//             {error && <p className="error-message">{error}</p>}
//             <div className="dialog-buttons">
//               <button
//                 type="button"
//                 className="button-secondary"
//                 onClick={onClose}
//               >
//                 Cancel
//               </button>
//               <button type="submit" className="button-primary">
//                 Change Password
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     )
//   );
// };


// export default PasswordChangeDialog;
import React, { useState } from "react";
import "../components/css/PasswordChangeDialog.css";
import { toast } from "react-toastify";

const PasswordChangeDialog = ({ isOpen, onClose, onChangePassword, username }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("New passwords don't match");
      toast.error("Passwords don't match!");
      return;
    }

    setIsLoading(true);
    try {
      await onChangePassword(currentPassword, newPassword);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    isOpen && (
      <div className="dialog-overlay">
        <div className="dialog">
          <h2 className="dialog-title">Change Password</h2>
          <form onSubmit={handleSubmit} className="dialog-form">
            <div className="form-group">
              <label className="form-label">
                Current Password
                <input
                  className="form-input"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  placeholder="Enter current password"
                />
              </label>
            </div>
            <div className="form-group">
              <label className="form-label">
                New Password
                <input
                  className="form-input"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  placeholder="Enter new password"
                />
              </label>
            </div>
            <div className="form-group">
              <label className="form-label">
                Confirm New Password
                <input
                  className="form-input"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm new password"
                />
              </label>
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="dialog-buttons">
              <button
                type="button"
                className="button-secondary"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="button-primary"
                disabled={isLoading}
              >
                {isLoading ? "Changing Password..." : "Change Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default PasswordChangeDialog;
