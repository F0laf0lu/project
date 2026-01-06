import {jwtDecode} from 'jwt-decode';
import dayjs from 'dayjs';


export function capitalize(word) {
    if (word.length === 0) {
        return "";
    }
    return word.toLowerCase().charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}


export const isTokenExpired = (token) => {
  if (!token) {
    return true;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true; 
  }
};

// getValueFromName("Mr", titleOptions, "Name", "Value")
export const getValueFromName = (name, utility, nameKey='Name', valueKey='Value')=>{
    
    if (!utility || !Array.isArray(utility) || !name) {
        return undefined;
    }

    const searchName = name.toLowerCase() //mr
    const foundUtility = utility.find(util =>{
        const utilityName = util[nameKey]
        if (!utilityName) {
            return undefined;
        }
        const compareName = utilityName.toLowerCase()
        return compareName === searchName
    })

    if (foundUtility['Seqnum']) {
      return foundUtility['Seqnum']
    }
    return foundUtility ? foundUtility[valueKey] : undefined
}


export const getNameFromValue = (value, utility, nameKey='Name', valueKey='Value')=>{
    
    if (!utility || !Array.isArray(utility) || !value) {
        console.log(false)
        return undefined;
    }
    const searchvalue = value  // 01
    const foundUtility = utility.find(util =>{
        const utilityValue = util[valueKey]
        if (!utilityValue) {
            return undefined;
        }
        return utilityValue === searchvalue
    })
    return foundUtility ? foundUtility[nameKey] : undefined  
}


export const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  try {
    return dayjs(dateString).format('YYYY-MM-DD');
  } catch (error) {
    return '';
  }
};


