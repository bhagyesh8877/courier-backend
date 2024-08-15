const { connectDatabase } = require('../../config/dbconfig');
const sql = require('mssql');

// Create a new manifest detail entry
const createManifestDetail = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const {
      mfno, awbno, fwdno, orign, dest, pcs, dpcs, mwt, dwt, amt
    } = req.body;

    const insertQuery = `
      INSERT INTO dbo.jbl_manifestdetail (
        mfno, awbno, fwdno, orign, dest, pcs, dpcs, mwt, dwt, amt
      )
      VALUES (
        @mfno, @awbno, @fwdno, @orign, @dest, @pcs, @dpcs, @mwt, @dwt, @amt
      );
    `;

    await pool.request()
      .input('mfno', sql.Int, mfno)
      .input('awbno', sql.VarChar, awbno)
      .input('fwdno', sql.VarChar, fwdno)
      .input('orign', sql.VarChar, orign)
      .input('dest', sql.VarChar, dest)
      .input('pcs', sql.Int, pcs)
      .input('dpcs', sql.Int, dpcs)
      .input('mwt', sql.Float, mwt)
      .input('dwt', sql.Float, dwt)
      .input('amt', sql.Float, amt)
      .query(insertQuery);

    res.status(201).json({ statusCode: 201, message: 'Manifest detail entry created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error creating manifest detail entry', error });
  }
};

// Get all manifest detail entries
const getManifestDetails = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const selectQuery = 'SELECT * FROM dbo.jbl_manifestdetail';
    const result = await pool.request().query(selectQuery);
    res.status(200).json({ statusCode: 200, entries: result.recordset });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error fetching manifest details', error });
  }
};

// Get a manifest detail entry by mfno
const getManifestDetailByMfno = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { mfno } = req.params;
    const selectQuery = 'SELECT * FROM dbo.jbl_manifestdetail WHERE mfno = @mfno';
    const result = await pool.request().input('mfno', sql.Int, mfno).query(selectQuery);
    res.status(200).json({ statusCode: 200, entry: result.recordset });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error fetching manifest detail entry', error });
  }
};

// Update a manifest detail entry by mfno
const updateManifestDetailByMfno = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { mfno } = req.params;
    const {
      awbno, fwdno, orign, dest, pcs, dpcs, mwt, dwt, amt
    } = req.body;

    const updateQuery = `
      UPDATE dbo.jbl_manifestdetail
      SET awbno = @awbno, fwdno = @fwdno, orign = @orign, dest = @dest, pcs = @pcs,
          dpcs = @dpcs, mwt = @mwt, dwt = @dwt, amt = @amt
      WHERE mfno = @mfno;
    `;

    await pool.request()
      .input('mfno', sql.Int, mfno)
      .input('awbno', sql.VarChar, awbno)
      .input('fwdno', sql.VarChar, fwdno)
      .input('orign', sql.VarChar, orign)
      .input('dest', sql.VarChar, dest)
      .input('pcs', sql.Int, pcs)
      .input('dpcs', sql.Int, dpcs)
      .input('mwt', sql.Float, mwt)
      .input('dwt', sql.Float, dwt)
      .input('amt', sql.Float, amt)
      .query(updateQuery);

    res.status(200).json({ statusCode: 200, message: 'Manifest detail entry updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error updating manifest detail entry', error });
  }
};

// Delete a manifest detail entry by mfno
const deleteManifestDetailByMfno = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { mfno } = req.params;
    const deleteQuery = 'DELETE FROM dbo.jbl_manifestdetail WHERE mfno = @mfno';
    await pool.request().input('mfno', sql.Int, mfno).query(deleteQuery);
    res.status(200).json({ statusCode: 200, message: 'Manifest detail entry deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error deleting manifest detail entry', error });
  }
};

module.exports = {
  createManifestDetail,
  getManifestDetails,
  getManifestDetailByMfno,
  updateManifestDetailByMfno,
  deleteManifestDetailByMfno,
};
