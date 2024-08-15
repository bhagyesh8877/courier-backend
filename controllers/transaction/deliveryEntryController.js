const { connectDatabase } = require('../../config/dbconfig');
const sql = require('mssql');

// Create a new delivery entry
const createDeliveryEntry = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const {
      AWBNO, refno, BKDATE, CLCODE, concomp, shippername, cname, conadd1, conadd2, orgcitycode,
      origincity, orgpin, conphone, shpcompany, shpname, shpadd1, shpadd2, shpphone, destination,
      DEST, DestPin, BMODE, PMODE, PKGS, BWT, vWT, cwt, AMOUNT, tdesc, tamt, descp, invvalue, 
      invno, policyno, policydate, policyvalue, USERNAME, branch, POD_DATE, POD_TIME, STATUS, 
      Recname, REMARKS, podbranch, BILLNO, famt, cnchrg, fbillno, autocal, ginno, drsno, codamt, 
      topayamt, fovamt, riskchrg, odaamt, Ewaybill, finyr, network, fuelper, fuelamt, networkno
    } = req.body;

    const insertQuery = `
      INSERT INTO dbo.jbl_DATAENTRY (
        AWBNO, refno, BKDATE, CLCODE, concomp, shippername, cname, conadd1, conadd2, orgcitycode,
        origincity, orgpin, conphone, shpcompany, shpname, shpadd1, shpadd2, shpphone, destination,
        DEST, DestPin, BMODE, PMODE, PKGS, BWT, vWT, cwt, AMOUNT, tdesc, tamt, descp, invvalue, 
        invno, policyno, policydate, policyvalue, USERNAME, branch, POD_DATE, POD_TIME, STATUS, 
        Recname, REMARKS, podbranch, BILLNO, famt, cnchrg, fbillno, autocal, ginno, drsno, codamt, 
        topayamt, fovamt, riskchrg, odaamt, Ewaybill, finyr, network, fuelper, fuelamt, networkno
      )
      VALUES (
        @AWBNO, @refno, @BKDATE, @CLCODE, @concomp, @shippername, @cname, @conadd1, @conadd2, @orgcitycode,
        @origincity, @orgpin, @conphone, @shpcompany, @shpname, @shpadd1, @shpadd2, @shpphone, @destination,
        @DEST, @DestPin, @BMODE, @PMODE, @PKGS, @BWT, @vWT, @cwt, @AMOUNT, @tdesc, @tamt, @descp, @invvalue, 
        @invno, @policyno, @policydate, @policyvalue, @USERNAME, @branch, @POD_DATE, @POD_TIME, @STATUS, 
        @Recname, @REMARKS, @podbranch, @BILLNO, @famt, @cnchrg, @fbillno, @autocal, @ginno, @drsno, @codamt, 
        @topayamt, @fovamt, @riskchrg, @odaamt, @Ewaybill, @finyr, @network, @fuelper, @fuelamt, @networkno
      );
    `;

    await pool.request()
      .input('AWBNO', sql.VarChar, AWBNO)
      .input('refno', sql.VarChar, refno)
      .input('BKDATE', sql.DateTime, BKDATE)
      .input('CLCODE', sql.VarChar, CLCODE)
      .input('concomp', sql.VarChar, concomp)
      .input('shippername', sql.VarChar, shippername)
      .input('cname', sql.VarChar, cname)
      .input('conadd1', sql.VarChar, conadd1)
      .input('conadd2', sql.VarChar, conadd2)
      .input('orgcitycode', sql.VarChar, orgcitycode)
      .input('origincity', sql.VarChar, origincity)
      .input('orgpin', sql.VarChar, orgpin)
      .input('conphone', sql.VarChar, conphone)
      .input('shpcompany', sql.VarChar, shpcompany)
      .input('shpname', sql.VarChar, shpname)
      .input('shpadd1', sql.VarChar, shpadd1)
      .input('shpadd2', sql.VarChar, shpadd2)
      .input('shpphone', sql.VarChar, shpphone)
      .input('destination', sql.VarChar, destination)
      .input('DEST', sql.VarChar, DEST)
      .input('DestPin', sql.VarChar, DestPin)
      .input('BMODE', sql.VarChar, BMODE)
      .input('PMODE', sql.VarChar, PMODE)
      .input('PKGS', sql.SmallInt, PKGS)
      .input('BWT', sql.Float, BWT)
      .input('vWT', sql.Float, vWT)
      .input('cwt', sql.Float, cwt)
      .input('AMOUNT', sql.Float, AMOUNT)
      .input('tdesc', sql.VarChar, tdesc)
      .input('tamt', sql.Float, tamt)
      .input('descp', sql.VarChar, descp)
      .input('invvalue', sql.Float, invvalue)
      .input('invno', sql.VarChar, invno)
      .input('policyno', sql.VarChar, policyno)
      .input('policydate', sql.DateTime, policydate)
      .input('policyvalue', sql.Float, policyvalue)
      .input('USERNAME', sql.VarChar, USERNAME)
      .input('branch', sql.VarChar, branch)
      .input('POD_DATE', sql.DateTime, POD_DATE)
      .input('POD_TIME', sql.VarChar, POD_TIME)
      .input('STATUS', sql.VarChar, STATUS)
      .input('Recname', sql.VarChar, Recname)
      .input('REMARKS', sql.VarChar, REMARKS)
      .input('podbranch', sql.VarChar, podbranch)
      .input('BILLNO', sql.Numeric, BILLNO)
      .input('famt', sql.Float, famt)
      .input('cnchrg', sql.Int, cnchrg)
      .input('fbillno', sql.VarChar, fbillno)
      .input('autocal', sql.VarChar, autocal)
      .input('ginno', sql.VarChar, ginno)
      .input('drsno', sql.Numeric, drsno)
      .input('codamt', sql.Float, codamt)
      .input('topayamt', sql.Float, topayamt)
      .input('fovamt', sql.Float, fovamt)
      .input('riskchrg', sql.Float, riskchrg)
      .input('odaamt', sql.Float, odaamt)
      .input('Ewaybill', sql.VarChar, Ewaybill)
      .input('finyr', sql.VarChar, finyr)
      .input('network', sql.VarChar, network)
      .input('fuelper', sql.Float, fuelper)
      .input('fuelamt', sql.Float, fuelamt)
      .input('networkno', sql.VarChar, networkno)
      .query(insertQuery);

    res.status(201).json({ statusCode: 201, message: 'Delivery entry created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error creating delivery entry', error });
  }
};

// Get all delivery entries
const getDeliveryEntries = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const selectQuery = 'SELECT * FROM dbo.jbl_DATAENTRY';
    const result = await pool.request().query(selectQuery);
    res.status(200).json({ statusCode: 200, entries: result.recordset });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error fetching delivery entries', error });
  }
};

// Get a delivery entry by AWBNO
const getDeliveryEntryByAWBNO = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { AWBNO } = req.params;
    const selectQuery = 'SELECT * FROM dbo.jbl_DATAENTRY WHERE AWBNO = @AWBNO';
    const result = await pool.request().input('AWBNO', sql.VarChar, AWBNO).query(selectQuery);
    res.status(200).json({ statusCode: 200, entry: result.recordset });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error fetching delivery entry', error });
  }
};

// Update a delivery entry by AWBNO
const updateDeliveryEntryByAWBNO = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { AWBNO } = req.params;
    const {
      refno, BKDATE, CLCODE, concomp, shippername, cname, conadd1, conadd2, orgcitycode, origincity,
      orgpin, conphone, shpcompany, shpname, shpadd1, shpadd2, shpphone, destination, DEST, DestPin,
      BMODE, PMODE, PKGS, BWT, vWT, cwt, AMOUNT, tdesc, tamt, descp, invvalue, invno, policyno, 
      policydate, policyvalue, USERNAME, branch, POD_DATE, POD_TIME, STATUS, Recname, REMARKS, 
      podbranch, BILLNO, famt, cnchrg, fbillno, autocal, ginno, drsno, codamt, topayamt, fovamt, 
      riskchrg, odaamt, Ewaybill, finyr, network, fuelper, fuelamt, networkno
    } = req.body;

    const updateQuery = `
      UPDATE dbo.jbl_DATAENTRY
      SET refno = @refno, BKDATE = @BKDATE, CLCODE = @CLCODE, concomp = @concomp, shippername = @shippername,
          cname = @cname, conadd1 = @conadd1, conadd2 = @conadd2, orgcitycode = @orgcitycode, origincity = @origincity,
          orgpin = @orgpin, conphone = @conphone, shpcompany = @shpcompany, shpname = @shpname, shpadd1 = @shpadd1,
          shpadd2 = @shpadd2, shpphone = @shpphone, destination = @destination, DEST = @DEST, DestPin = @DestPin,
          BMODE = @BMODE, PMODE = @PMODE, PKGS = @PKGS, BWT = @BWT, vWT = @vWT, cwt = @cwt, AMOUNT = @AMOUNT, tdesc = @tdesc,
          tamt = @tamt, descp = @descp, invvalue = @invvalue, invno = @invno, policyno = @policyno, policydate = @policydate,
          policyvalue = @policyvalue, USERNAME = @USERNAME, branch = @branch, POD_DATE = @POD_DATE, POD_TIME = @POD_TIME,
          STATUS = @STATUS, Recname = @Recname, REMARKS = @REMARKS, podbranch = @podbranch, BILLNO = @BILLNO, famt = @famt,
          cnchrg = @cnchrg, fbillno = @fbillno, autocal = @autocal, ginno = @ginno, drsno = @drsno, codamt = @codamt, 
          topayamt = @topayamt, fovamt = @fovamt, riskchrg = @riskchrg, odaamt = @odaamt, Ewaybill = @Ewaybill, finyr = @finyr,
          network = @network, fuelper = @fuelper, fuelamt = @fuelamt, networkno = @networkno
      WHERE AWBNO = @AWBNO;
    `;

    await pool.request()
      .input('AWBNO', sql.VarChar, AWBNO)
      .input('refno', sql.VarChar, refno)
      .input('BKDATE', sql.DateTime, BKDATE)
      .input('CLCODE', sql.VarChar, CLCODE)
      .input('concomp', sql.VarChar, concomp)
      .input('shippername', sql.VarChar, shippername)
      .input('cname', sql.VarChar, cname)
      .input('conadd1', sql.VarChar, conadd1)
      .input('conadd2', sql.VarChar, conadd2)
      .input('orgcitycode', sql.VarChar, orgcitycode)
      .input('origincity', sql.VarChar, origincity)
      .input('orgpin', sql.VarChar, orgpin)
      .input('conphone', sql.VarChar, conphone)
      .input('shpcompany', sql.VarChar, shpcompany)
      .input('shpname', sql.VarChar, shpname)
      .input('shpadd1', sql.VarChar, shpadd1)
      .input('shpadd2', sql.VarChar, shpadd2)
      .input('shpphone', sql.VarChar, shpphone)
      .input('destination', sql.VarChar, destination)
      .input('DEST', sql.VarChar, DEST)
      .input('DestPin', sql.VarChar, DestPin)
      .input('BMODE', sql.VarChar, BMODE)
      .input('PMODE', sql.VarChar, PMODE)
      .input('PKGS', sql.SmallInt, PKGS)
      .input('BWT', sql.Float, BWT)
      .input('vWT', sql.Float, vWT)
      .input('cwt', sql.Float, cwt)
      .input('AMOUNT', sql.Float, AMOUNT)
      .input('tdesc', sql.VarChar, tdesc)
      .input('tamt', sql.Float, tamt)
      .input('descp', sql.VarChar, descp)
      .input('invvalue', sql.Float, invvalue)
      .input('invno', sql.VarChar, invno)
      .input('policyno', sql.VarChar, policyno)
      .input('policydate', sql.DateTime, policydate)
      .input('policyvalue', sql.Float, policyvalue)
      .input('USERNAME', sql.VarChar, USERNAME)
      .input('branch', sql.VarChar, branch)
      .input('POD_DATE', sql.DateTime, POD_DATE)
      .input('POD_TIME', sql.VarChar, POD_TIME)
      .input('STATUS', sql.VarChar, STATUS)
      .input('Recname', sql.VarChar, Recname)
      .input('REMARKS', sql.VarChar, REMARKS)
      .input('podbranch', sql.VarChar, podbranch)
      .input('BILLNO', sql.Numeric, BILLNO)
      .input('famt', sql.Float, famt)
      .input('cnchrg', sql.Int, cnchrg)
      .input('fbillno', sql.VarChar, fbillno)
      .input('autocal', sql.VarChar, autocal)
      .input('ginno', sql.VarChar, ginno)
      .input('drsno', sql.Numeric, drsno)
      .input('codamt', sql.Float, codamt)
      .input('topayamt', sql.Float, topayamt)
      .input('fovamt', sql.Float, fovamt)
      .input('riskchrg', sql.Float, riskchrg)
      .input('odaamt', sql.Float, odaamt)
      .input('Ewaybill', sql.VarChar, Ewaybill)
      .input('finyr', sql.VarChar, finyr)
      .input('network', sql.VarChar, network)
      .input('fuelper', sql.Float, fuelper)
      .input('fuelamt', sql.Float, fuelamt)
      .input('networkno', sql.VarChar, networkno)
      .query(updateQuery);

    res.status(200).json({ statusCode: 200, message: 'Delivery entry updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error updating delivery entry', error });
  }
};

// Delete a delivery entry by AWBNO
const deleteDeliveryEntryByAWBNO = async (req, res) => {
  try {
    const pool = await connectDatabase();
    const { AWBNO } = req.params;
    const deleteQuery = 'DELETE FROM dbo.jbl_DATAENTRY WHERE AWBNO = @AWBNO';
    await pool.request().input('AWBNO', sql.VarChar, AWBNO).query(deleteQuery);
    res.status(200).json({ statusCode: 200, message: 'Delivery entry deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusCode: 500, message: 'Error deleting delivery entry', error });
  }
};

module.exports = {
  createDeliveryEntry,
  getDeliveryEntries,
  getDeliveryEntryByAWBNO,
  updateDeliveryEntryByAWBNO,
  deleteDeliveryEntryByAWBNO,
};
