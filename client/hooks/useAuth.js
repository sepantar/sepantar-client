import { useState, useEffect } from 'react';
// import { getUserProfile } from '../api/user'; // API untuk mendapatkan data pengguna

export const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fungsi untuk mendapatkan data pengguna dari API atau penyimpanan lokal
        const fetchUserProfile = async () => {
            try {
                // const userProfile = await getUserProfile(); // Ganti dengan metode Anda untuk mendapatkan profil
                setUser(userProfile);
            } catch (error) {
                console.error('Failed to fetch user profile', error);
            }
        };

        fetchUserProfile();
    }, []);

    return { user };
};
