import React, { useEffect, useState } from 'react'

const RequirementField = ({ name, label, register, errors, setValue, getValues }) => {
    const [requirement, setRequirement] = useState('');
    const [requirementList, setRequirementList] = useState([]);

    useEffect(()=>{
        register(name, {
            required:true,
            validate: (value) => value.length > 0
        })
    },[])

    useEffect(()=>{
        setValue(name, requirementList)
    },[requirementList])



    const handleAddRequirement = () => {
        if (requirement) {
            setRequirementList([...requirementList, requirement]);
            setRequirement('');
        }
    }
    const handleRemoveRequirement = (index) => {
        const updateRequirementList = [...requirementList];
        updateRequirementList.splice(index, 1);
        setRequirementList(updateRequirementList);
    }




    return (
        <div>
            <div>
                <label htmlFor={name}>{label}<sup>*</sup></label>
            </div>

            <div>
                <input
                    type='text'
                    id={name}
                    value={requirement}
                    onChange={(e)=> setRequirement(e.target.value)}
                    className='w-full'
                />

                <button
                    type='button'
                    onClick={handleAddRequirement}
                    className='font-semibold text-yellow-50'
                >
                    Add
                </button>
            </div>

            {
                requirementList.length > 0 && (
                    <ul>    
                        {
                            requirementList.map((item, index) => {
                                return (
                                    <li key={index} className='flex gap-2 items-center text-richblack-5'>
                                        <span>{item}</span>
                                        <button
                                            type='button'
                                            onClick={() => handleRemoveRequirement(index)}
                                            className='font-semibold text-yellow-50'
                                        >
                                            Remove
                                        </button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                )
            }
            {errors[name] && (
                    <span>
                        {label} is required
                    </span>
            )}





        </div>
    )
}

export default RequirementField