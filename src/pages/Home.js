
const HomePage=()=>{

    return(
        <>
        <form>
  <div class="mb-3">
    <label for="exampleInputAmount1" class="form-label">Amount</label>
    <input type="number" class="form-control" id="exampleInputAmount1"/>
  </div>
  <div class="mb-3">
    <label for="exampleInputDescription1" class="form-label">Description</label>
    <input type="text" class="form-control" id="exampleInputDescription1"/>
  </div>
  <label for="exampleInputCategory1" class="form-label">Category</label>
  <select class="form-select" aria-label="Default select example" id="exampleInputCategory1">
  <option value="1">Food</option>
  <option value="2">Petrol</option>
  <option value="3">Salary</option>
</select>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
        </>
    )
}

export default HomePage