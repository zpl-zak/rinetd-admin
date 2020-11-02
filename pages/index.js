import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import useSWR, { mutate } from 'swr'
import { useFormik } from 'formik';

const AddRouteForm = () => {
  const formik = useFormik({
    initialValues: {
      laddr: '10.20.40.2',
      rport: '80',
      port: '8080',
      udp: false
    },
    onSubmit: ({laddr, rport, port, udp}) => {
      if (port.length < 1) port = rport
      const range = rport.split('-')
      let num = 0;

      if (range.length > 1) {
        const start = parseInt(range[0])
        const end = parseInt(range[1])
        num = end - start
        rport = start
        port = start
      }

      for (let i = 0; i <= num; i++) {
        const call = `/api/v1/add/${rport}/${laddr}/${port}?udp=${udp}`
        console.log(call)
        rport++; port++
        fetch(call).then(() => mutate(`/api/v1/list`))
      }
    }
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <table>
        <tbody>
          <tr>
            <td><label htmlFor="laddr">Local Address: </label></td>
            <td><input name="laddr" type="text" value={formik.values.laddr} onChange={formik.handleChange}></input></td>
          </tr>
          <tr>
            <td><label htmlFor="rport">Remote Port: </label></td>
            <td><input name="rport" type="text" value={formik.values.rport} onChange={formik.handleChange}></input></td>
          </tr>
          <tr>
            <td><label htmlFor="port">Local Port: </label></td>
            <td><input name="port" type="text" value={formik.values.port} onChange={formik.handleChange}></input></td>
          </tr>
          <tr>
            <td><label htmlFor="udp">Is UDP: </label></td>
            <td><input name="udp" type="checkbox" value={formik.values.udp} onChange={formik.handleChange}></input></td>
          </tr>
          <tr>
            <td><input type="submit"></input></td>
          </tr>
        </tbody>
      </table>
    </form>
  )
}

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home() {
  const { data, error } = useSWR('/api/v1/list', fetcher)

  if (error) return <div>failed to load data</div>
  if (!data) return <div>loading...</div>

  const rows = data.map((row, i) => (
    <tr key={`entry_${i}`}>
      <td>{row.addr}</td>
      <td>{row.dport}</td>
      <td>{row.port}</td>
      <td><button onClick={() => {
        fetch(`/api/v1/del/${i}`).then(() => mutate(`/api/v1/list`))
      }}>Delete</button></td>
    </tr>
  ))

  return <>
    <h1>rinetd dashboard</h1>
    <h2>Add new routing entry</h2>
    <AddRouteForm/>
    <h2>Existing entries</h2>
    <table>
      <thead>
        <tr>
          <th>Local Address</th>
          <th>Destination Port</th>
          <th>Local Port</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
    <br/>
  </>
}
