import React from "react";
import { connect } from "react-redux";
import { IAdminTableProps } from "./types";
import Loading from "../Loading/Loading";
import { getApplicationList, setApplicationStatus, setSelectedForm, getApplicationEmails, getExportedApplications, getHackList } from "../store/admin/actions";
import ReactTable from "react-table";
import { get, values } from "lodash-es";
import 'react-table/react-table.css';
import { STATUS, TYPE, TRANSPORTATION_STATUS, TRANSPORTATION_TYPES, TRANSPORTATION_BUS_ROUTES, LOCATIONS } from "../constants";
import { IAdminState } from "../store/admin/types";
import ApplicationView from "./ApplicationView";
import { IBaseState } from "src/store/base/types";

const HackTable = (props: IAdminTableProps) => {
    const columns = [
        {
            "Header": "ID / Table",
            "accessor": "_id",
        },
        {
            "Header": "Title",
            "accessor": "title"
        },
        {
            "Header": "Devpost URL",
            "accessor": "devpostUrl",
            "Cell": p => p.value && <div><a target="_blank" href={p.value}>Link</a></div>
        },
        {
            "Header": "Categories",
            "accessor": "categories"
        }
    ];
    return (
        <div>
            <div className="col-12">
                <ReactTable filterable columns={columns} data={props.applicationList} minRows={0}
                    pages={props.pages}
                    manual
                    // loading={props.base.loading}
                    // defaultPageSize={1}
                    onFetchData={(state, instance) => props.getApplicationList && props.getApplicationList(state)}
                />
            </div>
            {props.selectedForm && <ApplicationView />}
        </div>
    );
}

const mapStateToProps = state => ({
    ...(state.admin as IAdminState),
    base: state.base as IBaseState
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    getApplicationList: (e) => dispatch(getHackList(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(HackTable);