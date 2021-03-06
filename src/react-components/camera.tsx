import * as React from 'react';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { createAction, CameraModes } from '../redux-reducers/camera';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Slider from 'material-ui/Slider';
import * as FontAwesome from 'react-fontawesome';
import { DEBOUNCE_SLIDER } from '../config';

function mapStateToProps(state) {
    return state.camera;
}

function mapDispatchToProps(dispatch) {
    return {
        setCameraMode: (cameraMode: CameraModes) => dispatch(createAction.CAMERA_MODE_SET(cameraMode)),
        setFov: (event: any, fov: number) => dispatch(createAction.CAMERA_FOV_SET(fov)),
    };
}

function Camera({ mode, fov, setCameraMode, setFov }) {
    return (
        <div>
            <Subheader>Camera mode</Subheader>

            <MenuItem
                onTouchTap={() => setCameraMode(CameraModes.ROTATE)}
                style={{ backgroundColor: CameraModes.ROTATE === mode ? '#ddd' : 'white' }}
                leftIcon={<FontAwesome name="repeat" />}
            >
                Rotate
            </MenuItem>
            <MenuItem
                onTouchTap={() => setCameraMode(CameraModes.MOVE)}
                style={{ backgroundColor: CameraModes.MOVE === mode ? '#ddd' : 'white' }}
                leftIcon={<FontAwesome name="arrows" />}
            >
                Move
            </MenuItem>

            {/*<Subheader>Camera FOV</Subheader>
            <MenuItem>
                <Slider
                    min={0.1}
                    max={3}
                    step={0.001}
                    value={fov}
                    onChange={_.debounce(setFov,DEBOUNCE_SLIDER)}
                />
            </MenuItem>*/}
        </div>
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Camera);
