import { StatisticsCard } from '@/widgets/cards'
import { Typography } from '@material-tailwind/react'
import React from 'react'
import { statisticsCardsData } from '../data/data'

const attendanceCard = ({id}) => {

  const handleViewDetailedReport = (id) => {
    console.log("idzzzzzzz", id)
  }

    return (
        <div>
            
             <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                    {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
                      <StatisticsCard
                        key={title}
                        {...rest}
                        title={title}
                        icon={React.createElement(icon, {
                          className: "w-6 h-6 text-white",
                        })}
                        footer={
                          <Typography className="font-normal text-blue-gray-600">
                            <strong className={footer.color}>{footer.value}</strong>
                            &nbsp;{footer.label}
                          </Typography>
                        }
                      />
                    ))}
                  </div>

                <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                    <button
                       onClick={() => handleViewDetailedReport(id)}
                        style={{
                                borderRadius: '8px',
                                padding: '0.5rem 1.5rem',
                                border: '1.5px solid #0d6efd', // Bootstrap primary blue
                                backgroundColor: 'transparent',
                                color: '#0d6efd',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                               }}
                                 className="custom-hover"
                      >       
                             View Detailed Report
                         </button>
                      </div>

        </div>
    )
}

export default attendanceCard
