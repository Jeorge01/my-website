import { useEffect, useState } from "react";

const useBirthdayCalculator = () => {
  const [myAge, setMyAge] = useState(0);

  useEffect(() => {
    const today = new Date();
    const birthdate = "2001-10-24";
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Check if the birthday has occurred this year
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    setMyAge(age);
  }, []);

  return myAge;
};

export default useBirthdayCalculator;
