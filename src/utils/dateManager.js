// Date manager to handle user-provided current date
class DateManager {
  constructor() {
    this.currentDate = null;
  }

  setCurrentDate(date) {
    // Ensure we're working with a proper Date object and normalize to local midnight
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);
    
    this.currentDate = normalizedDate;
    
    // Store as ISO date string (YYYY-MM-DD format) to avoid timezone issues
    const dateString = normalizedDate.getFullYear() + '-' + 
                      String(normalizedDate.getMonth() + 1).padStart(2, '0') + '-' + 
                      String(normalizedDate.getDate()).padStart(2, '0');
    
    localStorage.setItem('userCurrentDate', dateString);
  }

  getCurrentDate() {
    if (!this.currentDate) {
      const stored = localStorage.getItem('userCurrentDate');
      if (stored) {
        // Parse the stored date string and create a new Date object
        const [year, month, day] = stored.split('-').map(Number);
        this.currentDate = new Date(year, month - 1, day);
        this.currentDate.setHours(0, 0, 0, 0);
      }
    }
    return this.currentDate;
  }

  clearCurrentDate() {
    this.currentDate = null;
    localStorage.removeItem('userCurrentDate');
  }

  isDateSet() {
    return this.getCurrentDate() !== null;
  }

  // Helper method to convert Date to consistent string format for Firestore
  dateToFirestoreString(date) {
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);
    return normalizedDate.getFullYear() + '-' + 
           String(normalizedDate.getMonth() + 1).padStart(2, '0') + '-' + 
           String(normalizedDate.getDate()).padStart(2, '0');
  }

  // Helper method to convert Firestore string back to Date
  firestoreStringToDate(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    date.setHours(0, 0, 0, 0);
    return date;
  }
}

export const dateManager = new DateManager();