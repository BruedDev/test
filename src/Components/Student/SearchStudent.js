// import React, { useState } from 'react';
// import studentService from '../../services/studentService';

// function SearchStudent() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [results, setResults] = useState([]);

//   const handleSearch = async () => {
//     try {
//       const students = await studentService.searchStudents(searchTerm);
//       setResults(students);
//     } catch (error) {
//       console.error('Lỗi tìm kiếm:', error);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Tìm kiếm sinh viên..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <button onClick={handleSearch}>Tìm kiếm</button>

//       <ul>
//         {results.map((student) => (
//           <li key={student.id}>
//             {student.name} - {student.email} - {student.course}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default SearchStudent;
