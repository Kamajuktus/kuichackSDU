import React from 'react';
import styles from './styles.module.css'; // Предполагаемый файл стилей

const UserProfileIcon = ({ user, size = '1.5em', onClick }) => {
    return (
      <div className={styles.userProfileIcon} onClick={onClick} style={{ fontSize: size }}>
        {user?.icon ? (
          <img
            src={user.icon}
            alt="User Avatar"
            className={styles.avatar}
          />
        ) : (
          <FaUserCircle className={styles.defaultIcon} />
        )}
      </div>
    );
  };
  
  export default UserProfileIcon;