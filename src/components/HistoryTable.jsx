import React, {useState} from 'react';
import styled from 'styled-components'

const ShowButton = styled.a`
        color: #ff007a;
    `;
const TableDiv = styled.div`
    margin-top: 15px;
    max-height: 25em;
    overflow-y: scroll;
    border-bottom: 1px solid #ff007a;
    border-top: 1px solid #ff007a;
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
    display: none;
    }

`;
const DataTable = styled.table`
        width: 100%;
        text-align: center;

        th{
            border: 1px solid #ff007a;
            padding: 14px 10px 14px 10px;
            color: white;
            background-color: #ff007a;
        }
        th:nth-child(-n+3){
            border-right: 1px solid white;
        }
        td{
            padding: 7px 0 7px 0;
            border: 1px solid #ff007a;
        }
        tbody{
            display: table-row-group;
            height: 300px;
            overflow-y: auto;
        }
`;

function HistoryTable(props) {
    const [showTable, setShowTable] = useState(false);
    

    const handleTableView = () =>{
        setShowTable(!showTable)
    }

    return (
        <div>
            <br></br>
            <ShowButton onClick={handleTableView}>Show Table</ShowButton>
                {showTable && <TableDiv>
                    <DataTable>
                    <thead>
                        <tr key='0'>
                            <th>#</th>
                            <th>Date</th>
                            <th>Price ({props.currency})</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                    {props.tableData.map((object) => {return <tr key={object.Index}><td>{object.Index}</td><td>{object.Date}</td><td>{object.Price.toFixed(6)}</td><td>{object.Amount.toFixed(6)}</td></tr>})}
                    </tbody>
                </DataTable>
            </TableDiv>
            }
            
        </div>
    )
}

export default HistoryTable
