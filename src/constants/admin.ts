
export const ACCESS_TYPES: Record<number, string[]> = {
    1: ["All", "Access all customers."],
    2: ["Specified", "Access specified customers."],
    // 3: ["WITHOUT_SPECIFIED", "Access all customers without specified customers."]
};

export const USER_ROLE = {
    USER_ROLE_ADMIN: 1,
    DATA_SCIENTIST: 2,
    USER_ROLE_USER: 3,
    DATA_SCIENTIST_LEAD: 4,
    USER_ROLE_SALESFORCE: 5
};
export const FILTER_TYPE = {
    DAY: 1,
    MONTH: 2,
    YEAR: 3
};
export const TEXT_TIME: Record<number, string> = {
    1: "Daily",
    2: "Monthly",
    3: "Yearly"
};
export const SIZE_DATA = {
    DAY: 30,
    MONTH: 12,
    YEAR: 9
};


export const SC2_WHITELIST = [
    {
        "id": 3,
        "name": "busload_trigger"
    }, {
        "id": 1,
        "name": "busload_trigger"
    }, {
        "id": 2,
        "name": "busload_trigger"
    }, {
        "id": 4,
        "name": "busload_trigger"
    }, {
        "id": 5,
        "name": "busload_trigger"
    }, {
        "id": 6,
        "name": "busload_trigger"
    }, {
        "id": 7,
        "name": "busload_trigger"
    }, {
        "id": 8,
        "name": "busload_trigger"
    }, {
        "id": 9,
        "name": "busload_trigger"
    }, {
        "id": 10,
        "name": "busload_trigger"
    }, {
        "id": 11,
        "name": "busload_trigger"
    }, {
        "id": 12,
        "name": "busload_trigger"
    }, {
        "id": 13,
        "name": "busload_trigger"
    },
    {
        "id": 14,
        "name": "busload_trigger"
    }, {
        "id": 15,
        "name": "busload_trigger"
    }, {
        "id": 16,
        "name": "busload_trigger"
    }, {
        "id": 17,
        "name": "busload_trigger"
    },
    {
        "id": 150,
        "name": "cellular_signal_strength"
    },
    {
        "id": 277,
        "name": "coscr_st"
    },
    {
        "id": 272,
        "name": "coscr_stsub"
    },
    {
        "id": 142,
        "name": "defpumpactualdosingrate"
    },
    {
        "id": 253,
        "name": "derate_stat"
    },
    {
        "id": 240,
        "name": "dieselexhaustfluidtanktemperature"
    },
    {
        "id": 251,
        "name": "dl_defqualsnsrrgntpropfmi"
    },
    {
        "id": 256,
        "name": "dl_deftanksnsrrgntconcntrate"
    },
    {
        "id": 268,
        "name": "dl_deftanksnsrrgnttype"
    },
    {
        "id": 260,
        "name": "dl_lvldeftank_val"
    },
    {
        "id": 261,
        "name": "dl_tempdeftank_fmi"
    },
    {
        "id": 259,
        "name": "dl_tempdeftank_val"
    },
    {
        "id": 276,
        "name": "dpf_status"
    },
    {
        "id": 254,
        "name": "eddt_can1_mid00_c247_f9_w2"
    },
    {
        "id": 188,
        "name": "eddt_can1_mid00_e1365_w1"
    },
    {
        "id": 275,
        "name": "eddt_can1_mid00_e1408_w2"
    },
    {
        "id": 257,
        "name": "eddt_can1_mid00_e1465_w1"
    },
    {
        "id": 146,
        "name": "eddt_can1_mid22_c2425_f12_w2"
    },
    {
        "id": 258,
        "name": "eddt_can1_mid22_c3685_f9_w1"
    },
    {
        "id": 192,
        "name": "eddt_can1_mid25_c1888_f4_w1"
    },
    {
        "id": 265,
        "name": "eddt_can1_mid2e_c1192_f7_w1"
    },
    {
        "id": 139,
        "name": "eddt_can1_mid2e_c4576_f11_w1"
    },
    {
        "id": 204,
        "name": "eddt_can1_mid2e_c4576_f3_w1"
    },
    {
        "id": 165,
        "name": "enginechargeaircooleroutlettemperature"
    },
    {
        "id": 172,
        "name": "enginecoolanttemperature"
    },
    {
        "id": 166,
        "name": "engineexhaustgasrecirculationtemperature"
    },
    {
        "id": 200,
        "name": "enginefilteredfueldeliveryabsolutepressure"
    },
    {
        "id": 267,
        "name": "enginefueldeliveryabsolutepressure"
    },
    {
        "id": 178,
        "name": "enginefuelfilterdifferentialpressure"
    },
    {
        "id": 158,
        "name": "enginefuelsupplypumpintakeabsolutepressure"
    },
    {
        "id": 173,
        "name": "enginefuelsupplytemperature"
    },
    {
        "id": 220,
        "name": "engineloadfactorpid_f118mod_0to1range"
    },
    {
        "id": 273,
        "name": "engspd"
    },
    {
        "id": 131,
        "name": "eng_eddt_diags"
    },
    {
        "id": 125,
        "name": "eng_eddt_events"
    },

];

export const OPTION_CHART = {
    title: "",
    seriesType: "bars",
    series: {
        0: {
            pointWidth: 20,
            gapWidth: 5,
        },
    },

    annotations: {
        alwaysOutside: true,
        stem: {
            color: "transparent"
        },
    },
    textStyle: {
        fontSize: 14
    },
    hAxis: {
        textPosition: 'out',
        slantedText: true,
        gridlines: {
            count: -1
        }
    },
    vAxis: {
        textPosition: 'out',
        direction: '1',
        logScale: 'false',
        format: 'decimal'


    },
    chartArea: { width: '100%', height: '50%', top: "3%", left: "4%" },
    bar: {
        groupWidth: 20,
    },
    legend: {
        position: 'none',
    },
};

export const MONTH_MAPPING: Record<number, string> = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December"
};


export enum TabPaneId {
    DerivedChannel = "derived-channel",
    ViewTemplate = "view-template",
    FleetSetup = "fleet-setup",
    Teams = "teams",
    ChannelAlias = "channel-alias",
    EventInfo = "event-info",
    DataSource = "data-source",
    UserManager = "user-manager",
    UserLog = "user-log",
    Organization = "organization",
}