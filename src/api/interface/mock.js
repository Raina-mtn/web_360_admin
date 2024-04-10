const faultList = [{
  carriage: 0,
  createBy: 0,
  createTime: '2022-12-14T01:31:25.019Z',
  defectDesc: 'string',
  defectGrade: 0,
  defectNumber: 0,
  errorId: 'string',
  errorName: 'string',
  id: 0,
  patrolItemCode: 'string',
  patrolItemId: 0,
  patrolItemName: 'string',
  patrolNumber: 0,
  patrolTime: '2022-12-14T01:31:25.019Z',
  plateNumber: 'string',
  position: 'string',
  source: 'string',
  status: 'string',
  taskId: 0,
  taskTitle: 'string',
  updateBy: 0,
  updateTime: '2022-12-14T01:31:25.019Z',
  vehicleId: 0
}]
export const apiGetUserListMock = (data) =>new Promise((resolve)=>{
  resolve({data: faultList})
})
