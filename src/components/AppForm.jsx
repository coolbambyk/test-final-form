import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { TextField, Select } from "final-form-material-ui";
import { Typography, Paper, Grid, Button, MenuItem } from "@material-ui/core";
import { FormatNumbers, ParseForCompare } from "../utils/FormatNumbers";

const AppForm = () => {
  const [disableButton, setDisableButton] = useState(true);

  const onSubmit = async (values) => {
    console.log(values);
  };
  const validate = (values) => {
    const errors = {};
    if (Object.keys(errors).length === 0) {
      setDisableButton(false);
    }
    Object.values(values).forEach((value) => {
      value ? setDisableButton(false) : setDisableButton(true);
    });
    if (values.stickerPrice === " ") {
      errors.stickerPrice = "Sticker Price Required";
      setDisableButton(true);
    }
    if (values.onlinePrice === " ") {
      errors.onlinePrice = "Online Price Required";
      setDisableButton(true);
    }
    if (values.wholesalePrice === " ") {
      errors.wholesalePrice = "Wholesale Price Required";
      setDisableButton(true);
    }
    if (values.requiredDown === " ") {
      errors.requiredDown = "Required Down Required";
      setDisableButton(true);
    }
    if (
      values.stickerPrice &&
      values.wholesalePrice &&
      ParseForCompare(values.stickerPrice) >=
        ParseForCompare(values.wholesalePrice)
    ) {
      errors.stickerPrice =
        "Wholesale price should be more than the sticker price";
      setDisableButton(true);
    }
    return errors;
  };
  return (
    <div style={{ padding: 16, margin: "auto", maxWidth: 600 }}>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <em>
            <form onSubmit={handleSubmit} noValidate>
              <Paper style={{ padding: 16 }}>
                <Typography
                  variant="h4"
                  align="center"
                  component="i"
                  gutterBottom
                >
                  Pricing
                </Typography>
                <Grid container alignItems="flex-start" spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      name="markup"
                      component={Select}
                      label="Auto Markup?"
                      formControlProps={{ fullWidth: true }}
                      initialValue={"No"}
                    >
                      <MenuItem value="No">No</MenuItem>
                      <MenuItem value="Yes">Yes</MenuItem>
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      required
                      name="stickerPrice"
                      component={TextField}
                      type="number"
                      initialValue={""}
                      label="Sticker Price"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      format={FormatNumbers}
                      formatOnBlur
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      fullWidth
                      required
                      name="onlinePrice"
                      component={TextField}
                      type="number"
                      label="Online Price"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      format={FormatNumbers}
                      formatOnBlur
                      initialValue={""}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="wholesalePrice"
                      fullWidth
                      required
                      component={TextField}
                      type="number"
                      label="Wholesale Price"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      format={FormatNumbers}
                      formatOnBlur
                      initialValue={""}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      name="requiredDown"
                      fullWidth
                      required
                      component={TextField}
                      type="number"
                      label="Required Down"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      format={FormatNumbers}
                      formatOnBlur
                      initialValue={""}
                    />
                  </Grid>
                </Grid>
              </Paper>
              <Grid item style={{ marginTop: 30, textAlign: "right" }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={disableButton}
                >
                  <i>Save & close</i>
                </Button>
              </Grid>
            </form>
          </em>
        )}
      />
    </div>
  );
};

export default AppForm;
