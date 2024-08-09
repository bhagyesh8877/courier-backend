const { connectDatabase } = require('../../config/dbconfig');
const sql = require('mssql');

// Create a new Delivery Entry
const createDeliveryEntry = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { awbNo, status, branch, bookingDate, bookingTime, recName, origin, destination, consignor, consignee, address, recvDate, recvName, forwarder, fwdNo, pcs, dispDate, billingWt, mfstWt, dimensions } = req.body;

    const insertQuery = `
      INSERT INTO dbo.delivery_entry (awbNo, status, branch, bookingDate, bookingTime, recName, origin, destination, consignor, consignee, address, recvDate, recvName, forwarder, fwdNo, pcs, dispDate, billingWt, mfstWt, dimensions)
      VALUES (@awbNo, @status, @branch, @bookingDate, @bookingTime, @recName, @origin, @destination, @consignor, @consignee, @address, @recvDate, @recvName, @forwarder, @fwdNo, @pcs, @dispDate, @billingWt, @mfstWt, @dimensions);
    `;

    await pool.request()
      .input('awbNo', sql.VarChar, awbNo)
      .input('status', sql.VarChar, status)
      .input('branch', sql.VarChar, branch)
      .input('bookingDate', sql.Date, bookingDate)
      .input('bookingTime', sql.Time, bookingTime)
      .input('recName', sql.VarChar, recName)
      .input('origin', sql.VarChar, origin)
      .input('destination', sql.VarChar, destination)
      .input('consignor', sql.VarChar, consignor)
      .input('consignee', sql.VarChar, consignee)
      .input('address', sql.Text, address)
      .input('recvDate', sql.Date, recvDate)
      .input('recvName', sql.VarChar, recvName)
      .input('forwarder', sql.VarChar, forwarder)
      .input('fwdNo', sql.VarChar, fwdNo)
      .input('pcs', sql.Int, pcs)
      .input('dispDate', sql.Date, dispDate)
      .input('billingWt', sql.Decimal, billingWt)
      .input('mfstWt', sql.Decimal, mfstWt)
      .input('dimensions', sql.Text, dimensions)
      .query(insertQuery);

    res.status(201).json({ statusCode: 201, message: 'Delivery Entry created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error creating Delivery Entry', error });
  }
};

// Get all Delivery Entries
const getDeliveryEntries = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const selectQuery = 'SELECT * FROM dbo.delivery_entry';
    const result = await pool.request().query(selectQuery);
    res.status(200).json({ statusCode: 200, entries: result.recordset });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error fetching Delivery Entries', error });
  }
};

// Get Delivery Entry by AWB No
const getDeliveryEntryByAwbNo = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { awbNo } = req.params;
    const selectQuery = 'SELECT * FROM dbo.delivery_entry WHERE awbNo = @awbNo';
    const result = await pool.request().input('awbNo', sql.VarChar, awbNo).query(selectQuery);
    res.status(200).json({ statusCode: 200, entry: result.recordset });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error fetching Delivery Entry', error });
  }
};

// Update Delivery Entry by AWB No
const updateDeliveryEntryByAwbNo = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { awbNo } = req.params;
    const { status, branch, bookingDate, bookingTime, recName, origin, destination, consignor, consignee, address, recvDate, recvName, forwarder, fwdNo, pcs, dispDate, billingWt, mfstWt, dimensions } = req.body;

    const updateQuery = `
      UPDATE dbo.delivery_entry
      SET status = @status, branch = @branch, bookingDate = @bookingDate, bookingTime = @bookingTime, recName = @recName, origin = @origin, destination = @destination, consignor = @consignor, consignee = @consignee, address = @address, recvDate = @recvDate, recvName = @recvName, forwarder = @forwarder, fwdNo = @fwdNo, pcs = @pcs, dispDate = @dispDate, billingWt = @billingWt, mfstWt = @mfstWt, dimensions = @dimensions
      WHERE awbNo = @awbNo;
    `;

    await pool.request()
      .input('status', sql.VarChar, status)
      .input('branch', sql.VarChar, branch)
      .input('bookingDate', sql.Date, bookingDate)
      .input('bookingTime', sql.Time, bookingTime)
      .input('recName', sql.VarChar, recName)
      .input('origin', sql.VarChar, origin)
      .input('destination', sql.VarChar, destination)
      .input('consignor', sql.VarChar, consignor)
      .input('consignee', sql.VarChar, consignee)
      .input('address', sql.Text, address)
      .input('recvDate', sql.Date, recvDate)
      .input('recvName', sql.VarChar, recvName)
      .input('forwarder', sql.VarChar, forwarder)
      .input('fwdNo', sql.VarChar, fwdNo)
      .input('pcs', sql.Int, pcs)
      .input('dispDate', sql.Date, dispDate)
      .input('billingWt', sql.Decimal, billingWt)
      .input('mfstWt', sql.Decimal, mfstWt)
      .input('dimensions', sql.Text, dimensions)
      .input('awbNo', sql.VarChar, awbNo)
      .query(updateQuery);

    res.status(200).json({ statusCode: 200, message: 'Delivery Entry updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error updating Delivery Entry', error });
  }
};

// Delete Delivery Entry by AWB No
const deleteDeliveryEntryByAwbNo = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { awbNo } = req.params;
    const deleteQuery = 'DELETE FROM dbo.delivery_entry WHERE awbNo = @awbNo';

    await pool.request().input('awbNo', sql.VarChar, awbNo).query(deleteQuery);

    res.status(200).json({ statusCode: 200, message: 'Delivery Entry deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error deleting Delivery Entry', error });
  }
};

module.exports = {
  createDeliveryEntry,
  getDeliveryEntries,
  getDeliveryEntryByAwbNo,
  updateDeliveryEntryByAwbNo,
  deleteDeliveryEntryByAwbNo,
};
