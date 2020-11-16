import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = () => {
  const users = useSelector(state => state.users)
  
  if (!users) {
    return null
  }
  
  const TableRow = ({ row }) => (
    <tr>
      <td key={row.name}>
        <Link to={`/users/${row.id}`}>{row.name}</Link>
      </td>
      <td key={row.blogs}>{row.blogs.length}</td>
    </tr>
  )
  
  const UsersTable = ({ data }) => (
    <Table>
      <thead>
        <tr>
          <td>users</td>
          <td>number of blogs</td>
        </tr>
      </thead>
      {data.map(row => 
        <tbody key={row.id}>
          <TableRow row={row} />
        </tbody>
      )}
    </Table>
)
  
  return (
    <div className='container'>
      <h2>Users</h2>
      <UsersTable data={users} />
    </div>
  )
}

export default Users