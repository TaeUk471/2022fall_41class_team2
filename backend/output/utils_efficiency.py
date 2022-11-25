import json
import subprocess
from output.serializers import EfficiencyResultSerializer
from memory_profiler import memory_usage
from statistics import mean

LOC_FIELD = 'loc_score'
CONTROL_FLOW_COMPLEXITY_FIELD = 'control_flow_complexity_score'
RESERVATION_WORDS_FIELD = 'reservation_words_score'
DATA_FLOW_COMPLEXITY_FIELD = 'data_flow_complexity_score'


def run(result_id: int, full_filename: str):
    multimetric_output = execute_multimetric(full_filename=full_filename)
    mem_output = execute_memory_profiler(full_filename=full_filename)

    data = dict({
        'result_id': result_id,
    })
    data.update(multimetric_output)
    data.update(mem_output)

    serializer = EfficiencyResultSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    serializer.save()

    return serializer.data


def execute_multimetric(full_filename: str):
    # Run multimetric on a given file path
    process = subprocess.run(
        ['multimetric', f'{full_filename}'],
        stdout=subprocess.PIPE,
        universal_newlines=True
    )

    output = process.stdout
    output_json = json.loads(output)

    sloc_score = output_json['overall']['loc']
    cf_complexity_score = output_json['overall']['cyclomatic_complexity']
    r_words_score = output_json['overall']['halstead_difficulty']

    return {
        LOC_FIELD: sloc_score,
        CONTROL_FLOW_COMPLEXITY_FIELD: cf_complexity_score,
        RESERVATION_WORDS_FIELD: r_words_score,
    }

# todo: discuss whether we should use the avg, min, or max OR all three
#       -> current implementation is with avg mem usage 
#       -> "timeout" defines how long a program should be run before it is closed (set in case of non-terminating programs)
#       -> "MB" should be appended to the df_complexity score -- dunno if this should be done in frontend or backend
def execute_memory_profiler(full_filename: str):
    program = subprocess.Popen(["python", full_filename])
    mem_usage = memory_usage(proc=program, timeout=1)
    df_complexity_score = round(max(mem_usage),2)

    return {
        DATA_FLOW_COMPLEXITY_FIELD: df_complexity_score,
    }