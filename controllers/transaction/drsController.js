const { connectDatabase } = require('../../config/dbconfig');
const sql = require('mssql');

// Create a new DRS
const createDrs = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { ddate, drsno, pname, pcode, totalp, dbranch, delmode, remarks, areaname } = req.body;

    const insertQuery = `
      INSERT INTO dbo.jbl_drs (ddate, drsno, pname, pcode, totalp, dbranch, delmode, remarks, areaname)
      VALUES (@ddate, @drsno, @pname, @pcode, @totalp, @dbranch, @delmode, @remarks, @areaname);
    `;

    await pool.request()
      .input('ddate', sql.Date, ddate)
      .input('drsno', sql.VarChar, drsno)
      .input('pname', sql.VarChar, pname)
      .input('pcode', sql.VarChar, pcode)
      .input('totalp', sql.Int, totalp)
      .input('dbranch', sql.VarChar, dbranch)
      .input('delmode', sql.VarChar, delmode)
      .input('remarks', sql.VarChar, remarks)
      .input('areaname', sql.VarChar, areaname)
      .query(insertQuery);

    res.status(201).json({ statusCode: 201, message: 'DRS created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error creating DRS', error });
  }
};

// Get all DRS records
const getDrs = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const selectQuery = 'SELECT * FROM dbo.jbl_drs';
    const result = await pool.request().query(selectQuery);
    res.status(200).json({ statusCode: 200, drs: result.recordset });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error fetching DRS records', error });
  }
};

// Get DRS by drsno
const getDrsByDrsno = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { drsno } = req.params;
    const selectQuery = 'SELECT * FROM dbo.jbl_drs WHERE drsno = @drsno';
    const result = await pool.request().input('drsno', sql.VarChar, drsno).query(selectQuery);
    res.status(200).json({ statusCode: 200, drs: result.recordset });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error fetching DRS record', error });
  }
};

// Update DRS by drsno
const updateDrsByDrsno = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { drsno } = req.params;
    const { ddate, pname, pcode, totalp, dbranch, delmode, remarks, areaname } = req.body;

    const updateQuery = `
      UPDATE dbo.jbl_drs
      SET ddate = @ddate, pname = @pname, pcode = @pcode, totalp = @totalp, dbranch = @dbranch, delmode = @delmode, remarks = @remarks, areaname = @areaname
      WHERE drsno = @drsno;
    `;

    await pool.request()
      .input('ddate', sql.Date, ddate)
      .input('pname', sql.VarChar, pname)
      .input('pcode', sql.VarChar, pcode)
      .input('totalp', sql.Int, totalp)
      .input('dbranch', sql.VarChar, dbranch)
      .input('delmode', sql.VarChar, delmode)
      .input('remarks', sql.VarChar, remarks)
      .input('areaname', sql.VarChar, areaname)
      .input('drsno', sql.VarChar, drsno)
      .query(updateQuery);

    res.status(200).json({ statusCode: 200, message: 'DRS updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error updating DRS', error });
  }
};

// Delete DRS by drsno
const deleteDrsByDrsno = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { drsno } = req.params;
    const deleteQuery = 'DELETE FROM dbo.jbl_drs WHERE drsno = @drsno';
    await pool.request().input('drsno', sql.VarChar, drsno).query(deleteQuery);
    res.status(200).json({ statusCode: 200, message: 'DRS deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error deleting DRS', error });
  }
};

module.exports = {
  createDrs,
  getDrs,
  getDrsByDrsno,
  updateDrsByDrsno,
  deleteDrsByDrsno
};
