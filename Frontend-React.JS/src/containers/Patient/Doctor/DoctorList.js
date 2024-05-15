// DoctorList.jsx
import React from 'react';
import { GrPrevious, GrNext } from "react-icons/gr";

const DoctorList = ({ arrDoctors, currentPage, totalPages, handlePrevPage, handleNextPage, handlePageChange, handleViewDetailDoctor }) => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }

    return (
        <div>
            <div className='render-doctor'>
                {arrDoctors && arrDoctors.length > 0 &&
                    arrDoctors.map((item, index) => {
                        let imgBase64 = new Buffer(item.image, 'base64').toString('binary')
                        let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`

                        return (
                            <div className='item-all-doctor' key={index}>
                                <div className='doctor-item' onClick={() => handleViewDetailDoctor(item)}>
                                    <div className='left-all-doctor' style={{ backgroundImage: `url(${imgBase64})` }}></div>
                                    <div className='right-all-doctor'>
                                        <div>{nameEn}</div>
                                        <div>{item.Doctor_Info.Specialty.name}</div>
                                        <div>{item.Doctor_Info.nameClinic}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='pagination'>
                <button className='btn-prev' onClick={() => handlePrevPage(currentPage)}>
                    <GrPrevious />
                </button>
                <div className='pages'>
                    {pages.map((pageNumber) => (
                        <button className={`page ${pageNumber === currentPage ? 'active' : ''}`} key={pageNumber} onClick={() => handlePageChange(pageNumber)}>
                            {pageNumber}
                        </button>
                    ))}
                </div>
                <button className='btn-next' onClick={() => handleNextPage(currentPage)}>
                    <GrNext />
                </button>
            </div>
        </div>
    );
};

export default DoctorList;
